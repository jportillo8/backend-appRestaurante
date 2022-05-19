const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

/*
* IMPORTAR RUTAS
*/
const user_routes = require('./routes/user_routes');

// Node server
const server = http.createServer(app);


// Path to the public folder
// const publicPath = path.resolve(__dirname, 'public');
// // Le vamos a decir a nuestro servidor que sirva el contenido de la carpeta public
// app.use(express.static(publicPath));

// Debbuger errors
app.use(logger('dev'))
// Parsea el body de las peticiones
app.use(express.json())
// Permite que se puedan hacer peticiones desde cualquier origen
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Seguridad
app.disable('x-powered-by')

/*
LLAMAR DE RUTAS
*/
user_routes(app);


app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err)
    console.log('Server is listening on port', process.env.PORT);
})

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Ruta raiz')
})

// Configuracion de errores ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.message || 'Internal server error')
})
