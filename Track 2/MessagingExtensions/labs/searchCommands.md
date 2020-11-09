# Teams Messaging Extensions Search Actions 

En este laboratorio vamos a ver como crear comandos de búsqueda para la extensión de mensajeria, para ello vamos a hacer 2 ejemplos:

- En el primer ejemplo vamos a crear una busqueda que utilizará una api externa

    ![Demo compose](/labs/resources/searchCommandSummary-01.png)

- En el segundo ejemplo vamos a ver como crear tarjetas personalizadas cuando en el mensaje introducimos una url

    ![Demo message](/labs/resources/searchCommandSummary-02.png)


## Creando la solución en Visual Studio

1. Abre Visual Studio

1. Crea un proyecto con la plantilla "Echo Bot(Bot Framework v4 - .NET Core 3.1)

    ![Crear un proyecto de Visual Studio](/labs/resources/actionCommand-01.png)

1. Añade el nombre del proyecto, la ubicación y el nombre de la solución

    ![Configuración del proyecto](/labs/resources/actionCommand-02.png)

1. Abre el fichero appsetings.json e introduce los valores del registro del bot en Azure

    ```
    {
        "MicrosoftAppId": "[clientId]",
        "MicrosoftAppPassword": "[clientSecret]"
    }
    ```

1. Abre el fichero Bots -> EchoBot.cs 

1. Añade el siguiente using

    ```
    using Microsoft.Bot.Builder.Teams;
    ```

1. Modifica la línea

    ```
    public class EchoBot : ActivityHandler
    ```

    por

    ```
    public class EchoBot : TeamsActivityHandler
    ```

1. Elimina el código generado de la clase

## Creando el servicio de búsqueda

1. Crea una carpeta llamada Models 

1. Dentro de esta carpeta vamos a crear una clase llamada SearchResult.cs que contendrá el modelo del resultado de la búsqueda

1. Abre el fichero SearchResult.cs y añade el siguiente using
    ```
    using System.Collections.Generic;
    ```

1. Dentro de ese fichero añadimos las siguientes clases
    ```
    public class SearchItem
    {
        public double score { get; set; }
        public Show show { get; set; }
    }

    public class Show
    {
        public int id { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string language { get; set; }
        public List<string> genres { get; set; }
        public string status { get; set; }
        public int runtime { get; set; }
        public string premiered { get; set; }
        public string officialSite { get; set; }
        public Image image { get; set; }
        public string summary { get; set; }
    }

    public class Image
    {
        public string medium { get; set; }
        public string original { get; set; }
    }
    ```

1. Dentro de la carpeta Models vamos a crear otro fichero llamado ShowData.cs que contendra el modelo de la busqueda de una serie

1. Dentro de ese fichero añadimos las siguientes clases
    ```
    public class ShowData
    {
        public string id { get; set; }
        public string url { get; set; }
        public string name { get; set; }
        public string language { get; set; }
        public string status { get; set; }
        public string officialSite { get; set; }

        public ShowImage image { get; set; }

        public string summary { get; set; }

    }

    public class ShowImage
    {
        public string medium { get; set; }

        public string original { get; set; }
    }
    ```

1. En el raiz de la solución vamos a crear una carpeta llamada Services y dentro incluimos un fichero TvMazeService.cs

1. Abrimos el fichero y añadimos los siguientes using
    ```
    using [namespace].Models;
    using Newtonsoft.Json;
    ```

1. Dentro del código de la clase vamos a realizar los siguientes cambios:
    - Marcar la clase como estática
    - Crear una propiedad HttpClient para realizar las peticion http al servicio de búsqueda
    - Crear un método GetShowsByNameAsync que es el que realizará la búsqueda por nombre de la serie
    - Crear un método GetShowDataFromUrlAsync que es el que utilizamos para obtener los datos de una serie
    - Crear un método privado GetShowId que se encarga de obtener el id de la serie de la url que pasamos como parámetro

    Con estos cambios la clase quedaría asi: 

    ```
    public static class TvMazeService
    {
        static HttpClient client = new HttpClient();

        public static async Task<List<SearchItem>> GetShowsByNameAsync(string showName)
        {
            List<string> randomWords = new List<string>() { "Teams", "Game", "Fire", "Computer", "Fun" };
            string randomWord = randomWords[new Random().Next(randomWords.Count)];

            string searchParam = string.IsNullOrEmpty(showName) ? randomWord : showName;

            var path = string.Format("http://api.tvmaze.com/search/shows?q={0}", searchParam);

            HttpResponseMessage response = await client.GetAsync(path);

            if (response.IsSuccessStatusCode)
            {
                var result = JsonConvert.DeserializeObject<List<SearchItem>>(await response.Content.ReadAsStringAsync());
                return result;
            }

            return null;
        }

        public static async Task<ShowData> GetShowDataFromUrlAsync(string showUrl)
        {
            var id = GetShowId(showUrl);

            var path = $"http://api.tvmaze.com/shows/{id}";

            HttpResponseMessage response = await client.GetAsync(path);

            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsAsync<ShowData>();
                return result;
            }

            return null;
        }

        private static string GetShowId(string url)
        {
            var uri = new Uri(url);

            if (uri.Segments.Length > 3)
                return uri.Segments[2].Replace("/","");                
                
            return "0";
        }
    }
    ```

## Creando el bot

1. Para nuestro proyecto vamos a necesitar añadir los siguientes paquetes nuget:
    - AdaptiveCards: para manejar Adaptive Cards
    - AdaptiveCards.Templating: para crear Adaptive Cards a partir de plantillas
    - Html2Markdown: Las adaptive cards no admiten que texto en formato html, pero si en formato markdown, y el servicio de busqueda que estamos utilizando devuelve el contenido de la descripción de la serie en formato html. Con esta libreria convertiremos esta descripción en formato markdown

1. Abrimos el fichero Bots -> EchoBot.cs

1. Sustituimos los using del fichero por

    ```
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading;
    using System.Threading.Tasks;
    using AdaptiveCards;
    using AdaptiveCards.Templating;
    using Html2Markdown;
    using [namespace].Models;
    using [namespace].Services;
    using Microsoft.Bot.Builder;
    using Microsoft.Bot.Builder.Teams;
    using Microsoft.Bot.Schema;
    using Microsoft.Bot.Schema.Teams;
    using Newtonsoft.Json;
    ```

1. Vamos a añadir el método OnTeamsMessagingExtensionQueryAsync, que es el que se ejecuta al realizar la búsqueda

    ```
    protected override Task<MessagingExtensionResponse> OnTeamsMessagingExtensionQueryAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionQuery query, CancellationToken cancellationToken)
        {
            switch (query.CommandId)
            {
                case "searchQuery":
                    var text = query?.Parameters?[0]?.Value as string ?? string.Empty;

                    //TODO: Buscar una serie o pelicula a partir de su nombre
                    var searchResult = TvMazeService.GetShowsByNameAsync(text).Result;

                    List<MessagingExtensionAttachment> attachments = new List<MessagingExtensionAttachment>();

                    foreach (var item in searchResult)
                    {
                        string imageUrl = item.show.image != null ? item.show.image.medium : "https://i.vippng.com/png/small/365-3650886_esta-oportunidad-ya-no-est-disponible-not-available.png";

                        ThumbnailCard preview = new ThumbnailCard()
                        {
                            Title = item.show.name,
                            Subtitle = item.ToString(),
                            Images = new List<CardImage> { new CardImage(imageUrl) },
                        };

                        HeroCard card = new HeroCard()
                        {
                            Title = item.show.name,
                            Subtitle = item.ToString(),
                            Text = item.show.summary,
                            Images = new List<CardImage> { new CardImage(imageUrl) },
                        };

                        MessagingExtensionAttachment attachment = new MessagingExtensionAttachment()
                        {
                            Content = card,
                            Preview = card.ToAttachment(),
                            ContentType = HeroCard.ContentType
                        };

                        attachments.Add(attachment);
                    }

                    MessagingExtensionResult composeExtension = new MessagingExtensionResult()
                    {
                        AttachmentLayout = "list",
                        Type = "result",
                        Attachments = attachments
                    };

                    return Task.FromResult(new MessagingExtensionResponse(composeExtension));

                default:
                    throw new NotImplementedException($"Invalid CommandId: {query.CommandId}");
            }
        }
    ```

1. Ahora vamos a añadir el método OnTeamsAppBasedLinkQueryAsync, que es el que se ejecuta cuando introducimos una url con el dominio que definamos en el manifiesto

    ```
    protected override Task<MessagingExtensionResponse> OnTeamsAppBasedLinkQueryAsync(ITurnContext<IInvokeActivity> turnContext, AppBasedLinkQuery query, CancellationToken cancellationToken)
        {

            
            var data = TvMazeService.GetShowDataFromUrlAsync(query.Url).Result;

            var heroCard = new ThumbnailCard
            {
                Title = data.name,
                Subtitle = data.status,
                Text = "Texto personalizado",
                Images = new List<CardImage> { new CardImage(data.image.medium) },
            };

            var card = CreateAdaptiveCardAttachment(data);

            card.Preview = new Attachment(HeroCard.ContentType, null, heroCard);

            var result = new MessagingExtensionResult(AttachmentLayoutTypes.List, "result", new[] { card });

            return Task.FromResult(new MessagingExtensionResponse(result));
        }

        private static MessagingExtensionAttachment CreateAdaptiveCardAttachment(ShowData data)
        {
            // combine path for cross platform support
            string[] paths = { ".", "Resources", "adaptiveCard.json" };
            var templateJson = File.ReadAllText(Path.Combine(paths));
            AdaptiveCardTemplate template = new AdaptiveCardTemplate(templateJson);

            var converter = new Converter();
            data.summary = converter.Convert(data.summary);

            string adaptiveCardJson = template.Expand(data);

            var adaptiveCardAttachment = new Attachment()
            {
                ContentType = "application/vnd.microsoft.card.adaptive",
                Content = JsonConvert.DeserializeObject(adaptiveCardJson),
            };
            return adaptiveCardAttachment.ToMessagingExtensionAttachment();
        }
    ```

1. El método CreateAdaptiveCardAttachment que acabamos de crear utiliza una plantilla de una adaptive card en formato json, por lo que vamos a crear esa plantilla. Para ello vamos a crear una carpeta Resources dentro del raiz de la solución y vamos a crear dentro un fichero adaptiveCard.json

1. Abrimos ese fichero y copiamos dentro este contenido 

    ```
    {
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "size": "ExtraLarge",
      "weight": "Bolder",
      "text": "${name}",
      "wrap": true,
      "color": "Accent"
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "items": [
            {
              "type": "Image",
              "style": "Person",
              "url": "${image.medium}",
              "size": "Small",
              "width": "166px"
            }
          ],
          "width": "auto"
        },
        {
          "type": "Column",
          "items": [
            {
              "type": "TextBlock",
              "weight": "Bolder",
              "text": "${name}",
              "wrap": true
            },
            {
              "type": "TextBlock",
              "spacing": "None",
              "text": "${language}",
              "isSubtle": true,
              "wrap": true
            }
          ],
          "width": "stretch"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "${summary}",
      "wrap": true
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "Official site",
      "url": "${officialSite}"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2"
}
    ```

## Creando el paquete de la solución

1. Crea una carpeta en tu solución que se llame TeamsAppManifest

1. Copia los ficheros que se encuentran en la carpeta searchCommandManifest de este laboratorio en la carpeta que acabamos de crear

1. Abre el fichero manifest.json y modifica [botId] por el id del registro de tu bot

1. Crea un fichero .zip con los 3 ficheros que hay en la carpeta

1. Una vez creado el fichero zip sigue las instrucciones para [desplegarlo en Teams](/setup/teamsLoading.md)


