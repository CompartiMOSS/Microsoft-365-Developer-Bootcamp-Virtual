## Desplegar la aplicación de Microsoft Teams 

En ambos ejemplos vamos a crear un paquete .zip que tendremos que deplegar a Teams. Para ello tenemos 2 opciones:

    - Deplegarlo con App Studio
    - Sideloading

### Desplegar la aplicación de Microsoft Teams con App Studio
1. Abre App Studio y vete a la pestaña Manifest editor

    ![App Studio - Manifest editor](/setup/resources/appStudioDeploy-01.png)

1. Pulsa sobre Import an existing app y selecciona el zip que hemos creado en el paso anterior

    ![Importar una app](/setup/resources/appStudioDeploy-02.png)

1. Pulsa sobre Test and distribute

    ![Test and distribute](/setup/resources/appStudioDeploy-03.png)

1. Pulsa en Install para instalar la app

    ![Install](/setup/resources/appStudioDeploy-04.png)

### Sideloading
1. En el menú de Teams, pulsa sobre los puntos suspensivos y Más aplicaciones

    ![Más aplicaciones](/setup/resources/sideLoading-01.png)

1. Dentro del menú de la siguiente pantalla pulsa en Cargar una aplicación personalizada. 

    ![Aplicación personalizada](/setup/resources/sideLoading-02.png)

1. Puedes seleccionar si deseas cargarla para tu usuario y sus equipos o si quieres cargarla para todo el tenant

1. Selecciona el zip que deseas cargar

1. En la ventana modal selecciona Agregar