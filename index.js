const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');



require('dotenv').config();

console.log('Primero lo primero empiezo en el index.js');
/*
* IMPORTAR RUTAS
*/
const user_routes = require('./routes/user_routes');
console.log('Despues');

// Node server
// const server = http.createServer(app);


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

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Seguridad
app.disable('x-powered-by')

// Configuracion para poder subir imagenes a firebase
const upload = multer({
    storage: multer.memoryStorage()
})

/*
LLAMAR DE RUTAS
*/
user_routes(app, upload);


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
