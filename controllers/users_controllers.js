const User = require('../models/user');

module.exports = {

    register(req, res) {

        const user = req.body // Capturo los datos del usuario 
        // Creando un nuevo usuario
        User.create(user, (err, data) => {

            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err
                });
            }
            
            return res.status(201).json({
                success: true,
                message: 'Usuario creado con exito',
                data: data // El id de el nuevo usuario
            });
        })
    }
}