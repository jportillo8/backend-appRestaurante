const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const Rol = require('../models/rol');

console.log('Coomom hacemos el llamado a las rutas entonces Usamos los controladores');
module.exports = {
    
    // ====================== LOGIN ======================
    login(req, res){
        console.log('========= Cuando hacemos la peticion a la ruta /login, estamos en el controlador ========');
        const email = req.body.email;
        const password = req.body.password;
        console.log(`CARGAMOS lo que esta en el body de la peticion ${email} y ${password}`);

        User.findByEmail(email, async (err, myUser) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            
            if (!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no existe',
                    error: err
                });
            }
            
            // Esperamos que la contraseña sea correcta
            const isPasswordValid = await bcrypt.compareSync(password, myUser.password);
            if (isPasswordValid) {
                console.log(`La contraseña es valida con el bycrypt<<<<<<<<<<<<<<<<<<<<<<`);
                console.log('Le mandamos su token de acceso');
                const token = jwt.sign({
                    id: myUser.id,
                    email: myUser.email
                }, keys.secretOrKey, { });
                
                const data = {
                    id : `${myUser.id}`,
                    name: myUser.name,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session: `JWT ${token}`,
                    roles: JSON.parse(myUser.roles)
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario se ha logueado correctamente',
                    data: data 
                });
            }
            else {
                console.log(`La contraseña es no valida con el bycrypt>>>>>>>>>`);
                return res.status(401).json({
                    success: false,
                    message: 'El email o la contraseña no coinciden',
                    error: err
                });
            }            
        })
    },

// ====================== REGISTER ======================
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
    },
    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user)
        const files = req.files // Capturo la imagen

        if (files.length > 0) {
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path)

            if(url != undefined && url != null){
                user.image = url;
            }
        }

        User.create(user, (err, data) => {

            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err
                });
            }
            
            user.id = `${data}`;
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, keys.secretOrKey, { });

            user.session = `JWT ${token}`;

            // Agregando rol al usuario
            Rol.create(user.id, 3, (err, data) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Error al crear el rol',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'Usuario creado con exito',
                    data: user 
                });
            })
        })
    }
}