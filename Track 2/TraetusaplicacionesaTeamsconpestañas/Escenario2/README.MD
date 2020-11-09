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





