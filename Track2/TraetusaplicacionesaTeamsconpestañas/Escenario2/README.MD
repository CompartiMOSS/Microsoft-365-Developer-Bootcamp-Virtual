# Escenario 2: Creación de una aplicación en .NET CORE 

Vamos a crear una app que va a constar de dos partes:

1. Una API en .NET CORE que me va a devolver los Avengers 
2. Una APP Frontal en la que se mostrará estos Avengers

## ¿Que caracteristicas va a tener esta API? 
Por un lado esta API va a estar autenticada contra el Azure Active Directory, para ello veremos como crearnos una app en el Azure Active Directory y ver que permisos nos hacen falta.

## ¿Que características va a tener la APP?
Vamos a crear una aplicación en React, en la que para autenticarnos haremos uso de MSAL. Haremos uso de Graph Toolkit y veremos como diferenciamos cuando se esta en un contexto de Teams o fuera de Teams.

# Creación de la API

## Registrar en el Azure Active Directory la APP
Podemos ver los pasos en el Escenario 1, tan solo deberemos de cambiar los URL de devolución y el identificador de la Aplicación... pero para esto deberemos de tener la url que se ha publicado en Ngrok que la tendremos en tiempo de ejecución.

## Creación del Proyecto 

Para ello desde la linea de comandos preferida crearemos un proyecto en .NET Core de tipo WebAPI. En primer lugar nos crearemos una carpeta en blanco llamada por ejemplo bootcamp365. Nos posicionaremos sobre ella y ejecutaremos el siguiente comando.
```bash
dotnet new webapi
```

De la solución en blanco eliminaremos la carpeta Controller y el fichero WeatherForecast.cs.

Ahora nos crearemos las siguientes carpetas, "Data", "API", "Domain", y "Model" dentro de la solución.

En la carpeta "Data" copiamos el fichero llamado "avengers.json que se encuentra dentro de la carpeta assets.

Dentro de la carpeta "Model" nos crearemos el fichero "Avenger.cs" que tiene la siguiente estructura:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Bootcamp365.Model
{    
    [Table("Avenger")]
    public class Avenger 
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string UrlPhoto { get; set; }
        public string Description { get; set; }
    }
}
```
Dentro de la carpeta "Domain" nos crearemos los siguientes ficheros:
"IAvengerDomain.cs" 
```csharp
namespace Bootcamp365.Domain
{
    using System.Collections.Generic;      
    using Bootcamp365.Model;
    public interface IAvengerDomain
    {
        IEnumerable<Avenger> GetAll();        
    }
}
```
"AvengerDomain.cs" 
```csharp
namespace Bootcamp365.Domain
{    
    using System.Collections.Generic;    
    using Bootcamp365.Model;    

    public class AvengerDomain : IAvengerDomain
    {
         public IEnumerable<Avenger> avengerCollection { get; set; }
        public AvengerDomain()
        {
            var dataCustomer = JObject.Parse(File.ReadAllText(@"./Data/avengers.json"));
            var customerCollection = (JArray)dataCustomer["d"];
            this.avengerCollection = customerCollection.ToObject<IList<Avenger>>();
        }

        public IEnumerable<Avenger> GetAll()
        {
            return this.avengerCollection;            
        }
    }
}
```
Dejamos a la inquietud del lector el modificar este laboratorio e incluir una capa de base de datos en la misma por ejemplo haciendo uso de Entity Framework.

Ahora dentro de la carpeta "API" vamos a crear un controlador "AvengerController" con la siguiente estructura.
```csharp
using Bootcamp365.Domain;
using Microsoft.AspNetCore.Mvc;

namespace bootcamp365.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvengersController : ControllerBase
    {
        private readonly IAvengerDomain avengerDomain;

        public AvengersController(IAvengerDomain avengerDomain)
        {
            this.avengerDomain = avengerDomain;
        }
        /// <summary>
        /// Get Avengers
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "Get All Avengers")]
        public IActionResult Get()
        {
            var result = avengerDomain.GetAll();
            return Ok(result);
                
        }
    }
}
```

A continuación nos quedaria solucionar la inyección de dependencias, al tratarse de un proyecto pequeño y de demotración haremos uso del servicio que nos proporciona el propio Framework, pero dejo a la pericia del lector el utilizar algun otro contenedor de dependencias como AutoFac.

Para hacerlo nos vamos a la clase "Startup.cs" y reemplazamos el metodo ConfigureServices por el siguiente.

```csharp
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.TryAddTransient<IAvengerDomain, AvengerDomain>();
        }
```

Si ahora arrancamos nuestra aplicación deberiamos de visualizar lo siguiente:
![api](./assets/img/resultado.PNG)  

Una vez ya tenemos nuestro desarrollo funcionando lo que debemos de hacer es securizar nuestra API para ello tendremos que hacer lo siguiente:

Nos creamos una carpeta "Infraestructure" y una subcarpeta "Extensions" y nos creamos los siguientes ficheros.

AzureAdServiceCollectionExtensions.cs
```csharp
namespace Microsoft.AspNetCore.Authentication
{
    using bootcamp365.Infraestructure.Extensions;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using System;
    public static class AzureAdServiceCollectionExtensions
    {
        public static AuthenticationBuilder AddAzureAdBearer(this AuthenticationBuilder builder)
            => builder.AddAzureAdBearer(_ => { });
        public static AuthenticationBuilder AddAzureAdBearer(this AuthenticationBuilder builder, Action<AzureAdOptions> configureOptions)
        {
            builder.Services.Configure(configureOptions);
            builder.Services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureAzureOptions>();
            builder.AddJwtBearer();
            return builder;
        }
        private class ConfigureAzureOptions : IConfigureNamedOptions<JwtBearerOptions>
        {
            private readonly AzureAdOptions _azureOptions;
            public ConfigureAzureOptions(IOptions<AzureAdOptions> azureOptions)
            {
                _azureOptions = azureOptions.Value;
            }
            public void Configure(string name, JwtBearerOptions options)
            {
                options.Audience = _azureOptions.ClientId;
                options.Authority = $"{_azureOptions.Instance}{_azureOptions.TenantId}";
            }
            public void Configure(JwtBearerOptions options)
            {
                Configure(Options.DefaultName, options);
            }
        }
    }
}
```
AzureAdOptions.cs
```csharp
namespace bootcamp365.Infraestructure.Extensions
{
    public class AzureAdOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Instance { get; set; }
        public string Domain { get; set; }
        public string TenantId { get; set; }
    }
}
```

A continuación dentro de la clase Startup en el método ConfigureServices añadimos en la primera linea 
```csharp
services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddAzureAdBearer(options => Configuration.Bind("AzureAd", options));
```
 y en el método Configure antes del método UseAuthorization añadimos el método UseAuthentication quedando de la siguiente forma
 ```csharp
 public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
```
Ahora habilitaremos el cors para que desde la parte Front se pueda consultar sin ningun tipo de problema. Para ello al igual que hemos realizado en el anterior punto tenemos que modificar Startup en el método ConfigureServices 
```csharp
    services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                    });
            });
```
y el método Configure

```csharp
  app.UseCors();
```
Ahora en el fichero de "app.settings" añadiremos la siguiente configuración
```json
 "AzureAd": {
    "ClientId": "",
    "Domain": "",
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "",
    "CallbackPath": "/signin-oidc",
    "ClientSecret": "",
    "AppIDURL": "",
    "ConfigView": "MVC"
  }
```
Toda esta información la debemos de obtener del registro de la aplicación que hemos realizado en el punto anterior.

Si ahora lo ejecutamos nos devolverá un bonito Unathorize
![unauthorize](./assets/img/Unauthorize.PNG)  

Para comprobar si nuestra API bien podemos hacer uso de Postman o de configurar Swagger aqui os dejo unos enlaces de como poder hacerlo:
https://medium.com/@dineshbalani/authenticate-swagger-ui-against-azure-active-directory-in-asp-net-core-web-api-project-f0380dfe69ca 

https://liupeirong.github.io/postmanAzureFunctions/


Posteriormente tendremos que hacer algun endpoint extra ... pero lo dejamos para más adelante

# Creación del Front 

En primer lugar tenemos que tener instala la aplicación create-react-app para ello tendremos que ejecutar el siguiente script
```bash
npm install -g create-react-app
```
Si alguien ya lo tenia instalado recomdamos hacer un unnistall del create-react y ejecutar otra vez el comando.
A continuación nos creamos la base del proyecto para ello ejecutamos la siguiente instrucción
```bash
npx create-react-app bootcamp --template typescript
```

Una vez creado el proyecto reemplazamos el contenido del package.json por el siguiente 
```json
{
  "name": "bootcamp",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fluentui/react": "7.117.0",    
    "@microsoft/teams-js": "1.6.0",
    "@pnp/common": "1.3.2",
    "@testing-library/jest-dom": "4.2.4",
    "@testing-library/react": "9.3.2",
    "@testing-library/user-event": "7.1.2",
    "@types/i18n": "0.8.6",
    "@types/i18n-js": "3.0.1",
    "@types/jest": "24.0.0",
    "@types/node": "12.0.10",
    "@types/node-sass": "4.11.0",
    "@types/react": "16.9.0",
    "@types/react-dom": "16.9.0",
    "@types/react-hot-loader": "4.1.0",
    "@types/react-redux": "7.1.0",
    "@types/react-router-dom": "4.3.4",
    "@types/redux": "3.6.0",
    "@types/redux-thunk": "2.1.0",
    "@uifabric/icons": "7.1.0",
    "@webcomponents/webcomponentsjs": "2.2.10",
    "bootstrap": "4.4.1",
    "dom-to-image": "2.6.0",
    "i18next": "19.3.2",
    "i18next-browser-languagedetector": "4.0.2",
    "msal": "1.2.1",
    "node-sass": "4.13.1",
    "querystring": "0.2.0",
    "react": "16.12.0",
    "react-bootstrap": "1.0.0-beta.16",
    "react-butterfiles": "1.3.3",
    "react-circular-progressbar": "2.0.3",
    "react-dom": "16.12.0",
    "react-hot-loader": "4.11.1",
    "react-i18next": "9.0.10",
    "react-redux": "7.1.0",
    "react-router": "5.0.1",
    "react-router-dom": "5.0.1",
    "react-scripts": "3.0.1",
    "redux": "4.0.3",
    "redux-devtools-extension": "2.13.8",
    "redux-logger": "3.0.6",
    "redux-thunk": "2.3.0",
    "survey-react": "1.1.31",
    "toastr": "2.1.4",
    "typescript": "~3.7.2"
  },
  "scripts": {
    "start": "env-cmd -e LOCAL react-scripts start",
    "build": "env-cmd -e LOCAL react-scripts build",    
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@microsoft/mgt": "1.3.0",
    "@types/redux-logger": "3.0.7",
    "@types/toastr": "^2.1.38",
    "env-cmd": "10.0.1",
    "mgt-react": "1.3.0-preview.2",
    "react-app-polyfill": "1.0.6",
    "webpack": "4.29.6"
  }
}
```
A continuación crearemos el fichero de variables para ello en la raiz del proyecto crearemos un fichero .env-cmdrc.json que tendra el siguiente contenido
```json
{
    "LOCAL": {
      "REACT_APP_ENVIRONMENT": "LOCAL",
      "REACT_APP_MSALAUTHORITY": "https://login.microsoftonline.com/common",
      "REACT_APP_MSALCLIENTID": "",
      "REACT_APP_MSALCLIENTID_URI": "",
      "REACT_APP_API": "https://localhost:44399"      
    }
}
```
Donde el MSALClientId y el MSALClientId_Uri son los datos que hemos obtenido en el registro de la applicación.

Ahora modificaremos el tsconfig para poder añadir tipos any y simplificar un poco el desarrollo. Para ello dentro de la opcion de strict que inicialmente esta a true la ponemos a false.

A continuación nos creamos una carpeta security donde vamos a tener configurado Msal. Para ello dentro de security tendremos tres subcarpetas (hoc,login y msal)
Dentro de msal tendremos los siguientes ficheros
msal.ts
```typescript
import { UserAgentApplication, AuthenticationParameters } from 'msal';
import { BearerTokenFetchClient, FetchOptions, isUrlAbsolute } from '@pnp/common';
import { msalConfig } from './msalConfig';

export const msalInstance = new UserAgentApplication(msalConfig);
export class PnPFetchClient extends BearerTokenFetchClient {
  constructor(private authContext: UserAgentApplication) {
    super(null);
  }

  public async fetch(url: string, options: FetchOptions = {}): Promise<Response> {
    if (!isUrlAbsolute(url)) {
      throw new Error('You must supply absolute urls to PnPFetchClient.fetch.');
    }
    let token="";

    token= await this.getToken(this.getResource(url));
    
    return super.fetch(url, options);
  }
 
  private async getToken(resource: string): Promise<string> {
    const request: AuthenticationParameters = {
    };
    request.scopes = [process.env.REACT_APP_MSALCLIENTID];    
    if (resource.indexOf('graph') !== -1) {
      request.scopes = ["User.Read.All"];
    }
    try {
      const response = await this.authContext.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      if (this.requiresInteraction(error.errorCode)) {
        this.authContext.loginRedirect(request);
      } else {
        throw error;
      }
    }
  }
 
  private requiresInteraction(errorCode: string) {
    if (!errorCode || !errorCode.length) {
      return false;
    }
    return errorCode === "consent_required" ||
      errorCode === "interaction_required" ||
      errorCode === "login_required";
  }

  private getResource(url: string): string {
    const parser = document.createElement('a');
    parser.href = url;
    return `${parser.protocol}//${parser.hostname}`;
  }

}
```
msalConfig.ts
```typescript
export const msalAuthConfig = {
	authority: process.env.REACT_APP_MSALAUTHORITY,
	clientId: process.env.REACT_APP_MSALCLIENTID,
	postLogoutRedirectUri: window.location.origin
}
export const msalCacheConfig = {
	storeAuthStateInCookie: true,
	CacheLocation: 'localStorage'
};
export const msalConfig = {
	auth: msalAuthConfig,
	cache: msalCacheConfig
};
```

Una vez ya lo tenemos vamos a crearnos el modelo de los Avengers. En la carpeta de model nos creamos la siguiente interface
iavengers.ts
```typescript
export default interface IAvengers {
    id:string
    name:string;
    description:string;
    image:string;    
    }
```
Con el modelo ya creado nos crearemos la llamada a la API que vamos a realizar, por eso en la carpeta API nos creamos un fichero index.ts donde tendremos las llamadas a la API implementada en el primer punto.
index.ts
```typescript
import IAvengers from '../model/iavengers';
import { msalInstance } from '../security/hoc/security';
import { PnPFetchClient } from '../security/msal/msal';

const baseURL = process.env.REACT_APP_API + '/api';

const getAvengersAsync = async (): Promise<IAvengers[]> => {
    const addManagedURL =`${baseURL}/avengers`;
    const pnp = new PnPFetchClient(msalInstance);    
    const requestParams = {
            headers:
             { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'                        
              },    
              mode: 'cors' as RequestMode,               
              method:'GET'           
          };
    
    const response = await pnp.fetch(addManagedURL, requestParams);        
    debugger;
    const responseOne = await (response.json());
    return mapToAvengers(responseOne);    
}

const mapToAvengers = (response:any): IAvengers[] => {
    const result: IAvengers[] = [];
    response.map((item:any) => {
        const avengerMap: IAvengers = {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.urlPhoto  
        };
        result.push(avengerMap);
    });
    return result;
}

export const avengerAPI = {    
    getAvengersAsync  
}
```
Ahora empezaremos a crearnos unos Hooks para tener nuestras llamadas a la API. Para ello nos crearemos una carpeta Hooks, con una subcarpeta custom y crearemos el fichero 
useAvengersCollection.tsx
```typescript
import * as React from 'react';
import { avengerAPI } from '../../api';

export const useAvengerCollection = () => {
    const [avengerCollection, setAvengerCollection] = React.useState([]);  
    const loadAvengers = () => {         
        avengerAPI.getAvengersAsync()
          .then(json => setAvengerCollection(json));
    };
      return {avengerCollection, loadAvengers, setAvengerCollection};
};
```
Ahora nos crearemos un componente que hará uso de este Hook Custom que hemos creado
```typescript
import * as React from 'react';
import IAvengers from '../model/iavengers';
import { useAvengerCollection } from './custom/useAvengersCollection';

export const LoadListComponent = () => {                

    const {avengerCollection, loadAvengers} = useAvengerCollection();    
    const [filter,setFilter]= React.useState('');        
    React.useEffect(() => {                    
        loadAvengers();
    },[avengerCollection.length]);
     
        let i:number=0;   
        const avengerFilter:IAvengers[]=  avengerCollection.filter(x=>x.name.toString().search(filter)===0);
return (

<div className="container">
<div className="row">
<div className="col-lg-12 my-3">
            <div className="pull-right">
                <div className="btn-group">    
                </div>
            </div>
        </div>
    </div> 
    <div className="col-md-6 col-md-offset-3">
                <div className="well well-sm">
                    <div className="form-group">
                        <label className="col-md-3 control-label" htmlFor="name">Buscar</label>
                        <div className="col-md-9">
                            <input id="name" name="name" type="text" placeholder="Name Avenger" onChange={(value)=>{setFilter(value.target.value)}} className="form-control"/>
                        </div>
                    </div>
                </div>
    </div>
    <div id="products" className="row view-group">
        {            
            avengerFilter.map((item:IAvengers)=>{
                i=i+1;                
                return (
                    <div className="item col-xs-4 col-lg-4" key={item.id}>
                    <div className="thumbnail card">
                        <div className="img-event">
                            <img className="group list-group-image img-fluid" src={item.image} alt="" />
                        </div>
                        <div className="caption card-body">
                            <h4 className="group card-title inner list-group-item-heading">
                                {item.name}</h4>
                            <p className="group inner list-group-item-text">
                                {item.description}
                            </p>
                            <div className="row">                                
                                <div className="col-xs-12 col-md-6">                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                );                
            })
        } 
   </div>                    
</div>)
    }
```
A continuación nos creamos un componente Layout.tsx dentro de la carpeta layout.tsx en la que tendrá el siguiente contenido.
```typescript
import * as React from 'react';
export interface ILayoutProps {
    children?: React.ReactNode;
}
export class Layout extends React.Component<ILayoutProps> {
    public render() {
        return (
            <div>
                <div>
                     {this.props.children} 
                </div>
            </div>
        );
    }
}
```
Continuaremos creando las rutas de nuestra app, para ello en la raiz nos crearemos un fichero de Routes con el siguiente contenido.
```typescript
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/layout';
import { LoadListComponent } from './hooks/listAvengersHooks';
import { withAuth } from './security/hoc/security';

export const routes =
    <Switch>       
        <Layout>
            <Switch>
            <Route exact={true} path='/' component={withAuth(LoadListComponent)} />            
            </Switch>
        </Layout>
    </Switch>;
```

Luego ya nos queda por poner el index.tsx y añadimos el siguiente código 
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { initializeIcons } from '@uifabric/icons';
import * as RoutesModule from './routes';
import { AuthenticationParameters } from 'msal';
import { Providers, SimpleProvider, ProviderState } from '@microsoft/mgt';
import { msalInstance } from './security/msal/msal';

const routes = RoutesModule.routes;

declare global {
  /* eslint-disable-next-line */
  namespace JSX {
      interface IntrinsicElements {
          'mgt-flyout':any;
          'mgt-login': any;
          'mgt-person': any;
          'mgt-msal-provider': any;
          'mgt-tasks': any;
          'mgt-people-picker': any;
          'mgt-person-card': any;
          'person': any;
      }
  }
}
Providers.globalProvider = new SimpleProvider(async (scopes) => {
  const request: AuthenticationParameters = {  };
    request.scopes = scopes;
    console.log(scopes);
		return msalInstance.acquireTokenSilent(request).then((response) => {
			return response.accessToken;
		});

});
Providers.globalProvider.setState(ProviderState.Loading);
function renderApp() {
  initializeIcons(undefined, { disableWarnings: true });

  ReactDOM.render(
    <AppContainer>      
        <BrowserRouter basename={process.env.PUBLIC_URL}>          
          {routes}          
        </BrowserRouter>      
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp();
reportWebVitals();
```

Como podeis ver hemos configurado en la aplicación un SimpleProvider para que funcione con Graph Toolkit, ahora como lo integramos en nuestro aplicación nos vamos al hook listAvengersHook.tsx y añadimos la referencia al componente mgt-person quedando de la siguiente forma
```typescript
...
<div className="container">
<mgt-person person-query='me' show-name show-email ></mgt-person>
<div className="row">
...
```

Si ahora arrancamos la aplicación Web con el siguiente comando
```bash
npm run build
```
Si todo ha ido bien tendremos que visualizaremos la siguiente pantalla 
![modoHulk](./assets/img/Front.PNG)  

## ¿Como lo integramos con Teams?

En primer lugar tenemos que hacer todo lo del laboratorio 1. Ahora bien en el ejemplo por defecto de Teams tienen una llamada en Servidor que se hace en Express ahora como lo hacemos eso en este caso... en primer lugar nos vamos a crear un endpoint en la API en la que vamos a devolver un token valido para Graph y validado por Teams.

En primer lugar nos creamos una clase AccesToken.cs dentro de la carpeta de Model
```csharp
using Newtonsoft.Json;

namespace WebApplication5.Model
{
    public class AccessToken
    {
        [JsonProperty(PropertyName = "access_token")]
        public string Access_token { get; set; }
        [JsonProperty(PropertyName = "token_type")]
        public string Token_type { get; set; }
        [JsonProperty(PropertyName = "expires_in")]
        public long Expires_in { get; set; }
        [JsonProperty(PropertyName = "ext_expires_in")]
        public long Ext_expires_in { get; set; }
    }
}
```
A continuación nos crearemos una carpeta Service y nos crearemos dos ficheros IGraphService.cs y GraphService.cs con la siguiente definición
```csharp
using System.Threading.Tasks;
using WebApplication5.Model;

namespace WebApplication5.Service
{
    public interface IGraphService
    {        
        Task<AccessToken> GetTokenTeams(string token, string tenantId);
    }
}
```
```csharp
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebApplication5.Model;

namespace WebApplication5.Service
{
    public class GraphService : IGraphService
    {
        private readonly IConfiguration config;
        private readonly HttpClient httpClient;
        

        public GraphService(IConfiguration Configuration)
        {
            this.config = Configuration;
            this.httpClient = new HttpClient();
            
        }

  

        public async Task<AccessToken> GetTokenTeams(string token, string tenantId)
        {

            string loginUri = $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token";
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));

            var requestData = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer"),
                new KeyValuePair<string, string>("client_id", this.config.GetSection("AzureAd:ClientId").Value),
                new KeyValuePair<string, string>("client_secret", this.config.GetSection("AzureAd:ClientSecret").Value),
                new KeyValuePair<string, string>("assertion", token),
                new KeyValuePair<string, string>("requested_token_use", "on_behalf_of"),
                new KeyValuePair<string, string>("scope", "https://graph.microsoft.com/user.read"),

            };

            var requestBody = new FormUrlEncodedContent(requestData);

            var request = await httpClient.PostAsync(loginUri, requestBody);
            var response = await request.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<AccessToken>(response);

        }
    }
}
```

Una vez ya tenemos el metodo vamos a implementar un endpoint en nuestra API, vamos a dejarlo abierto ya que se considera un escenario de pruebas, pero nuestra recomendación es securizar este endpoint y solamente permitirlo llamarlo desde Teams y añadirle alguna header de seguridad. Este controller lo llamaremos AuthController y quedaria de la siguiente forma.
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication5.API
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using TeamsQuiz.Infraestructure.Abstract;
    using TeamsQuiz.Services.Abstract;
    using TeamsQuiz.Shared.Common.Constants;
    using TeamsQuiz.Shared.Models.Config;
    using WebApplication5.Service;

    namespace TeamsQuiz.API.Auth
    {
        [Route("api/[controller]")]
        [ApiController]

        public class AuthController : ControllerBase
        {
                        
            private readonly IGraphService graphService;



            public AuthController( IGraphService graphService)
            {                
                this.graphService = graphService;
            }

           

            [HttpPost]            
            [Route("tokenteams")]
            public async Task<IActionResult> GetTokenTeams([FromBody] string token)
            {
                var tenantId = HttpContext.User.FindFirst(c => c.Type == "http://schemas.microsoft.com/identity/claims/tenantid")?.Value;
                var response = await graphService.GetTokenTeams(token, tenantId);                
                return Ok(response);
            }            
        }
    }
}
```

Ahora nos quedaria pendiente añadir la inyección de dependencias en el StartUp añadiendo la siguiente linea al final del método Services
```csharp
    services.TryAddTransient<IGraphService, GraphService>();        
```

A continuación en el Front vamos a modificar el comportamiento si entramos en Teams. Por eso en primer lugar vamos a comprobar si estamos en Teams o no estamos en Teams, en el caso de que estemos en Teams lo que vamos a realizar en primer lugar es pedirle un Token a Teams que nos garantice el SSO y con dicho Token realizaremos una petición a nuestra API para que nos de un token "valido" por Graph para poder seguir haciendo peticiones. En esta ocasión nos vamos a almacenar el token en la cache y de esta forma nos ahorramos pedirlo cada vez (Tener en cuenta que estamos en un ejercicio demo). Para ello tendriamos que hacer lo siguiente:

Función para saber si estamos en Teams o no (la propia que hay en el SDK no se comporta bien)
```typescript
export default class TeamsFunctions {
    public static IsInTeams(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

```

Ahora se modifica el index.tsx quedando de la siguiente forma:
```typescript
if (TeamsFunctions.IsInTeams()) {
	microsoftTeams.getContext(function (context: any) {		 
					microsoftTeams.authentication.getAuthToken({
						successCallback: (tokenGraph: string) => {
							 authAPI.getTokenGraph2Async(tokenGraph).then((token: string) => {
								localStorage.setItem("token", token);
							 });
						},
						failureCallback: (reason: string) => {
							console.log(reason);
						}, resources: [process.env.REACT_APP_MSALCLIENTID]
					})
					renderApp();
				});						
}
else {
	renderApp();
}
```

Ahora que tendriamos que hacer modificar el SimpleProvider para ello lo que haremos es coger el token que acabamos de obtener y quedaria de la siguiente forma
```typescript
Providers.globalProvider = new SimpleProvider(async (scopes) => {

	if (!TeamsFunctions.IsInTeams()) {
		const request: AuthenticationParameters = {
		};
		request.scopes = scopes;
		return msalInstance.acquireTokenSilent(request).then((response) => {
			return response.accessToken;
		});
	}
	else {
		return localStorage.getItem("token")
	}
});
```

y por último lo que nos quedaria es en el Fetch coger el token segun corresponda  para ello modificamos el codigo al siguiente 
```typescript
  public async fetch(url: string, options: FetchOptions = {}): Promise<Response> {
    if (!isUrlAbsolute(url)) {
      throw new Error('You must supply absolute urls to PnPFetchClient.fetch.');
    }
    let token = "";
    if (!TeamsFunctions.IsInTeams()) {
      token = await this.getToken(this.getResource(url));
    }
    else {
      token = localStorage.getItem("adal_44");
    }
    this.token = token;
    Providers.globalProvider.setState(ProviderState.SignedIn);
    return super.fetch(url, options);
  }
```

## Todavia hay mas 
Ahora nos queda crear la APP de Teams bien haciendo uso de APP Studio o bien desde el propio Visual Studio Code.

