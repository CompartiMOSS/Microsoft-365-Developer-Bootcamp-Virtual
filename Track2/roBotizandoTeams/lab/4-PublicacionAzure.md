Queremos que nuestro bot esté disponible públicamente, para ello necesitaremos publicarlo en Azure; lo que conlleva crear una web app y un bot channels registration.

Vamos al [portal de Azure](https://portal.azure.com/), a nuestro grupo de recursos _roBotizandoTeams_, clicamos en +Add, buscamos _Web App Bot_ y clicamos en _Crear_

![resource group -> +Add -> Web App Bot -> Create](https://dev.azure.com/esalcedoo/a9ddfdb1-0226-4f4f-a89d-42e9d69b4f3b/_apis/git/repositories/66d8fc7f-f7ae-4b26-a4aa-03920094c86a/Items?path=%2F/.attachments/image-cd2477fd-5204-490f-9785-3817a425f49d.png)

Tendremos que dar nombre, ubicación y tier al _bot service_, especificar un _app service plan_ para la _web app_ del bot y un _app insights_.

![image.png](https://dev.azure.com/esalcedoo/a9ddfdb1-0226-4f4f-a89d-42e9d69b4f3b/_apis/git/repositories/66d8fc7f-f7ae-4b26-a4aa-03920094c86a/Items?path=%2F/.attachments/image-f897144e-38fc-4e02-a184-70db74950c6d.png)

Vemos que nos pide crear un _Microsoft App Id_ y _Microsoft App Password_, dejamos que los cree por defecto. Una vez desplegado, estas claves aparecerán como _**app settings**_ en la _web app_.

