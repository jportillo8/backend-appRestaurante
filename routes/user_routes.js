const user_controller = require('../controllers/users_controllers');

console.log('y pasamos a las rutas Estoy en user_routes.js');
module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    app.post('/api/users/create', user_controller.register);
    app.post('/api/users/createWithImage', upload.array('image',1), user_controller.registerWithImage);
    app.post('/api/users/login', user_controller.login);
}