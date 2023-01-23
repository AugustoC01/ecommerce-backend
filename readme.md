# Ecommerce

## Proyecto Backend

Este ecommerce esta desarrollado con Node utilizando Express. Utiliza la base de datos Mongo Atlas y las vistas estan desarrolladas con Handlebars

#### Table of Contents

- [Tecnologias](#Tecnologias)
- [Instalacion](#Instalacion)
- [Rutas](#Rutas)
- [Userflow](#Userflow)

## Tecnologias

Este proyecto Este proyecto usa proyectos open source para funcionar:.

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDb] - Base de datos en la nube

## Instalacion

Proyecto desarrollado eb [Node.js](https://nodejs.org/) v16.19.0.

Para clonar el proyecto

```sh
git clone https://github.com/AugustoC01/backend-CannataFernandez.git -b ProyectoFinal
npm i
```

Para ejecutarlo en entornos de desarrollo (utilizando nodemon, modo fork, puerto por defecto 8080)

```sh
npm run dev
```

Para ejecutarlo en entornos de produccion (en modo cluster)

```sh
npm start
```

Para ejecutarlo con tus propios parametros con nodemon o npm. Por defecto, con el primer comando, si NODE_ENV se encuentra en development, inicia en modo fork y puerto 8080. En cualquier otro NODE_ENV que no sea development, inicia en modo cluster y puerto 8080. El NODE_ENV puede ser cambiado desde .env

```sh
nodemon server.js
nodemon server.js --port 8080 --mode cluster
nodemon server.js --port 8080 --mode fork
```

## Rutas

Si se levanta el proyecto de manera local se puede acceder desde [localhost]. Los enlaces funcionan con el puerto por defecto = 8080

#### Rutas de usuario

|  Ruta   | Metodo |       Accion       |
| :-----: | :----: | :----------------: |
| /login  |  GET   |   Vista de login   |
| /login  |  POST  |  Inicio de sesion  |
| /signup |  GET   |  Vista de signup   |
| /signup |  POST  |  Creacion de user  |
| /logout |  GET   |  Vista de logout   |
| /logout |  POST  | Deslogueo del user |

Hay ademas, dos rutas extra para manejar el error en login y en signup

#### Rutas de productos

Estas rutas son a partir de [localhost/productos]. Si un producto tiene stock = 0 entonces no aparecera en ninguna vista.

|    Ruta     | Metodo |            Accion             |
| :---------: | :----: | :---------------------------: |
|      /      |  GET   |      Vista de productos       |
| /:categoria |  GET   |   Filtra productos por cat.   |
|  /prod/:id  |  GET   |  Vista de detalle de un prod  |
|   /create   |  GET   | Vista de interfaz de creacion |
|  /edit/:id  |  GET   | Vista de interfaz de edicion  |
|      /      |  POST  |     Creacion de producto      |
|    /:id     |  PUT   |    Edicion de un producto     |
|    /:id     | DELETE |     Eliminar un producto      |

#### Rutas de carrito

Estas rutas son a partir de [localhost/carrito]

|   Ruta   | Metodo |            Accion             |
| :------: | :----: | :---------------------------: |
|    /     |  GET   | Vista de productos en carrito |
|    /     |  POST  |      Finaliza la compra       |
| /:prodId |  POST  | Agrega un producto al carrito |
| /:prodId | DELETE | Borra un producto del carrito |
|    /     | DELETE |       Vaciar el carrito       |

#### Rutas de chat

Estas rutas son a partir de [localhost/chat]

|  Ruta   | Metodo |       Accion        |
| :-----: | :----: | :-----------------: |
|    /    |  GET   |   Vista del chat    |
| /:email |  GET   | Vista del historial |

Desde la vista de chat se pueden iniciar consultas y acceder al historial de cada user

#### Userflow

![Recorrido por el proyecto](/public/images/userflow.gif)

## License

MIT
**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[mongodb]: https://www.mongodb.com/cloud
[localhost]: http://localhost:8080
[localhost/productos]: http://localhost:8080/productos
[localhost/carrito]: http://localhost:8080/carrito
[localhost/chat]: http://localhost:8080/chat
