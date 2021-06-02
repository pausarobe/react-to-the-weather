# REACT TO THE WEATHER

React to the Weather es una prueba de concepto MERN (Mongo + Express + React + Node).


### Demon en Heroku

[Demo en Heroku](https://aqueous-taiga-52067.herokuapp.com/#/)

(Heroku al ser gratuito puede que tarde unos segundos de más en cargar la primera vez)


### Install & Run

Para correr el proyecto en local seguir los siguientes pasos:

1) Clonar el repositorio: *git clone https://github.com/pausarobe/react-to-the-weather.git*
2) Primero vamos a ejecutar el frontend. Acceder a la carpeta: *cd react-to-the-weather/client*
3) Instalar las dependencias: *npm install*
4) Ejecutar el front: *npm start*

Actualmente el front está llamando a la API alojada en Heroku. Si se quiere cambiar para llamar contra el backend en local hay que seguir los siguientes pasos:

1) Acceder al archivo *http-common.js* situado en la ruta *client/src* y cambiar el param baseURL por: *http://localhost:8080/api*
2) Acceder a la backend desde la raiz: *cd react-to-the-weather/server/api*
3) Instalar las dependencias: *npm install*
4) Ejecutar el back: *node api.js*


### Otras consideraciones

**Advertencia:** Los datos del tiempo (temperatura, precipitaciones, etc..) están generados de forma aleatoria. No guardan ninguna coherencia entre si.
