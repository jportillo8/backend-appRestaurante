const categorie_controller = require('../controllers/categories_controllers');
const passport = require('passport');

console.log('y pasamos a las rutas Estoy en user_routes.js');
module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    app.post('/api/categories/create', passport.authenticate('jwt',{session: false}), categorie_controller.create);

}