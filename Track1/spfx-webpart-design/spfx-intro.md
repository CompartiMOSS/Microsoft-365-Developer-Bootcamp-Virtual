# SPFx Webpart

## Creación de un webpart SPFx

1. Abriremos la consola de comandos y navegaremos a la carpeta donde queremos crear nuestro proyecto.

1. Ejecutaremos Yeoman con el siguiente comando:

    ```shell
    yo @microsoft/sharepoint
    ```

    Crearemos el webpart con la información que indicamos a continuación:

    * **What is your solution name?**: HelloWorld
    * **Which baseline packages do you want to target for your component(s)?**: SharePoint Online only (latest)
    * **Where do you want to place the files?**: Create a subfolder with solution name
    * **Do you want to allow the tenant admin the choice of being able to deploy the solution to all sites immediately without running any feature deployment or adding apps in sites?**: No
    * **Will the components in the solution require permissions to access web APIs that are unique and not shared with other components in the tenant?**: No    
    * **Which type of client-side component to create?**: WebPart
    * **What is your Web part name?**: HelloWorld
    * **What is your Web part description?**: HelloWorld description
    * **Which framework would you like to use?**: No JavaScript framework

    Una vez se haya provisionado la estructura de carpetas requerida para el proyecto, el generador se descargará toda la dependencia de paquetes a través de NPM.

1. Una vez creado el webpart, la abrimos en Visual Studio Code con el comando:

    ```shell
    code .
    ```

## Probar el webpart

Antes de probar nuestro webpart en SharePoint, es necesario instalar un certificado de desarrollador en nuestro entorno de desarrollo __una única vez__. Para ello sólo tenemos que ejecutar el siguiente comando en la carpeta donde esté nuestra solución SPFx. Si ya lo tenemos instalado, podemos simplemente ignorar este paso.
    
```shell
gulp trust-dev-cert
```

Posteriormente ejecutaremos el proyecto con el siguiente comando:

    ```shell
    gulp serve
    ```

La tarea _serve_ de Gulp lo que hará será ejecutar el proyecto, arrancando un servidor web local y abriendo un navegador con el Workbench de SharePoint:

![Screenshot of the SharePoint Workbench](./assets/ex01-01.png)

Seleccionamos el icono de webpart para abrir la lista de webparts disponibles.

![Screenshot of adding the HelloWorld web part](./assets/ex01-02.png)

Seleccionamos el webpart que acabamos de crear: **HelloWorld**.

![Screenshot of the HelloWorld web part](./assets/ex01-03.png)

Editamos las propiedades del webpart pinchando en el lápiz en la barra de la izquierda del webpart.

![Screenshot of the web part edit toolbar](./assets/ex01-04.png)

En el panel de propiedades que se abre, modificaremos el valor del campo **Description Field**. Podremos observar que el webpart se va actualizando a medida que el texto se va cambiando.

![Screenshot of editing the web part property pane](./assets/ex01-05.png)

Para finalizar, cerraremos el navegador y pararemos el servidor local pulsando <kbd>CTRL</kbd>+<kbd>C</kbd> en la consola de comandos.