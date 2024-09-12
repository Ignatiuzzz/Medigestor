# PROYECTO N6: MY PICTURE

Este proyecto es una aplicación web desarrollada con el stack MERN (MongoDB, Express, React, Node.js). A continuación, se detallan los pasos necesarios para configurar y ejecutar el proyecto localmente.

![MongoDB](https://www.turing.com/blog/wp-content/uploads/2022/02/Mongo-DB-Features.jpg) ![Express NodeJs](https://i.ytimg.com/vi/wVo-UMit5Ig/maxresdefault.jpg) ![React](https://blog.scottlogic.com/dkerr/assets/featured/react.png)

## Estructura del Proyecto

El proyecto se divide en dos partes principales: el cliente (`client`) creado con React y el servidor (`backend`) construido con Express y Node.js.

### Paso 1: Estructura del Proyecto

1. **Cliente React**:
   - La base del cliente se crea con `create-react-app`.
   - La carpeta `client` contiene la aplicación React.
2. **Servidor Express**:
   - La carpeta raiz aloja el servidor Express y la configuración de la base de datos.

### Paso 2: Configuración de la Base de Datos

1. Asegúrate de tener **MongoDB** instalado localmente o utiliza **MongoDB Atlas** para una base de datos en la nube.
2. Crea una base de datos llamada `mypicture_db`.

### Paso 3: Configuración del Servidor y Conexión a la Base de Datos

1. Dentro de la carpeta `backend`, ejecuta `npm init -y` para iniciar un nuevo proyecto Node.js.
2. Instala **Express** y **Mongoose** con `npm install express mongoose`.
3. Configura Mongoose para conectar con MongoDB en `server.js`.

### Paso 4: Configuración React en el Cliente

1. Utiliza la carpeta `src/components` en `client` para tus componentes React.
2. Añade estilos globales en `src/styles`.

### Paso 5: Interactividad y Comunicación con el Servidor

1. Para realizar peticiones al servidor desde el cliente, considera usar **Axios** (`npm install axios` en `client`).
2. Usa Axios o Fetch API para comunicarte con el backend y realizar operaciones CRUD.

### Paso 6: Ejecución del Proyecto

1. **Iniciar el servidor backend**:
   - Navega a `backend` y ejecuta `node server.js`.
2. **Iniciar la aplicación React**:
   - En otra terminal, ve a `client` y ejecuta `npm start`.

#DESARROLLADORES Y SUS FUNCIONES  
Ignatiuzz (Ignacio Garcia) -> Diseno Frontend   
TheBig-C (Cesar vera) -> Backend  
DIN (Christian Mendoza) -> Backend  
Manu20033 (Manuel Delgadillo) -> Diseno Frontend  
