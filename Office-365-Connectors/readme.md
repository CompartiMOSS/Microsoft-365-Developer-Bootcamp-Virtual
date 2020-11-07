# Conectores para Teams

## Ponente: **Ángel Carrillo**
* Twitter: [@angeIdav](https://twitter.com/angeIdav)
* LinkedIn: [angeldav](https://www.linkedin.com/in/angeldav/)

---

## Introducción

Los conectores sirven para mantener actualizado un equipo mediante la entrega de contenido y actualizaciones de servicios directamente en un canal. Se pueden recibir actualizaciones de servicios populares como Trello, Wunderlist, GitHub ó Azure DevOps dentro del flujo de chat de su equipo.

Los conectores de Office 365 365 se pueden usar con equipos de Microsoft Teams y grupos de Office 365, lo que permite que todos los miembros permanezcan sincronizados y reciban la información relevante rápidamente. Tanto Microsoft Teams como Exchange usan el mismo modelo de conector, que le permite usar los mismos conectores en ambas plataformas.

El **objetivo** de este workshop es poder generar una conectores para **Teams** y poder mandar información a nuestros canales de una forma sencilla. Exploraremos los webhooks entrantes (_incoming webhooks_), haremos un conector personalizado que desplegaremos en Azure y explicaremos cómo evolucionar este servicio a través de las Adaptive Cards.

## Prerrequisitos

* Disponer de un tenant de Office 365 que permita la carga de aplicaciones en Teams.
* Tener una cuenta de Power Automate para poder trabajar con conectores premium.
* Tener una cuenta de Azure en la que poder crear una App Service.
* Tener instalada y configurada la _toolchain_ de desarrollo. Esto es: Visual Studio Code, Node.js, npm, Gulp, Yeoman y el generador de Yeoman de **Teams**.

Toda la información para crear y configurar el entorno y la _toolchain_ de desarrollo la podéis encontrar [aquí](https://github.com/SharePoint/sp-dev-training-spfx-getting-started). Para instalar el generador de Yeoman de Teams sólo tenéis que lanzar el siguiente comando: 

```shell
npm install generator-teams
```

## Ejercicios

**1.-** [Creación de un conector a través de webhooks entrantes (_incoming webhooks_)](./incoming-webhooks/readme.md)

**2.-** [Creación de un conector personalizado en una WebApp de Azure](./webapp-connector/readme.md)

**3.-** [Adaptive Cards](./adaptive-cards/readme.md)