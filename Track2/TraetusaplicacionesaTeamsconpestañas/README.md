# Trae tus aplicaciones a Teams con pestañas (M365 Dev Bootcamp 2020 Virtual)

## Ponentes
1. Robert Bermejo - Azure MVP [@robertbemejo](https://twitter.com/robertbemejo)
2. Adrián Díaz - MS Office Development MVP [@AdrianDiaz81](https://twitter.com/AdrianDiaz81)

En este laboratorio, vamos a ver como podemos a traer tus aplicaciones a Teams mediante pestañas.

## Indice

  - Introducción
  - Pre-requisitos: Azure subscription, Office 365 Tenant, SPFx, Yo Teams, ngrok...
  - Ejercicio 1 : Utilizar yeoman de Teams 
  - Ejercicio 2 : Adaptar tu desarrollo para Teams

## Introducción
En el mundo actual y con la llegada e introducción de Teams muchas empresas les ha surgido la necesidad de que tienen que hacer para incorporar sus desarrollos ya existentes o los nuevos que surjan dentro de un contexto de Teams.  

Aqui el principal inconveniente que tiene Teams es la forma en la que una aplicación se autentica con Teams para ellos recomiendo que leamos el siguiente artículo de [Compartimoss](http://www.compartimoss.com/revistas/numero-39/ms-teams-como-autenticar-nuestros-desarrollos).

Partiendo de la base de que por regla general vamos a tener un escenario que es que nuestro desarrollo se va a autenticar contra el Azure Active Directory, vamos a plantear dos escenario.

1. [Escenario 1](./Escenario1/README.md): Vamos a crear una aplicación haciendo uso del Yeoman de Teams 
2. [Escenario 2](./Escenario2/README.MD): Tenemos una Aplicación desarrollada en .NET Core con un Front en cualquier Frameworks JS y veremos como incluirla en teams 

## Pre Requisitos

Para completar el laboratorio, se requiere (recomendamos acudir al lab con esto ya instalado/configurado, de lo contrario, seguramente no dará tiempo a completar el lab):

- Suscripción de Azure con usuario Administrador de la misma
- Tenant de Office 365 con usuario Administrador de la misma
- Prepara tu Tenant para Teams development. Sigue estos pasos: [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant)
- [ngrok](https://ngrok.com/) instalado y configurado. Sigue estos pasos:
    - Crea una cuenta en la web de ngrok (es gratis)
    - Instala ngrok usando npm: 
        ```js 
        npm install ngrok -g   
        ```
    - Configura el Auth Token de ngrok (al crearte la cuenta, la web te dará esa información)
        ```js
        ngrok authtoken <YOUR_AUTHTOKEN>
        ```
- Visual Studio Code & Visual Studio Ultiamte 
- Instala el generador para Teams de Yeoman:
    ```js
    npm install yo gulp-cli --global
    npm install generator-teams --global
    ```