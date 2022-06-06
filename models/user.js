const db = require('../config/config');
const bcrypt = require('bcrypt');
const User = {};

console.log('Como requiero la base de datos, segundo voy a los modelos');

User.findById = (id, result) => {
    const sql = `
    SELECT 
        U.id, 
        U.email, 
        U.name, 
        U.phone, 
        U.image, 
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON 
        UHR.id_rol = R.id
    WHERE 
        id = ?
    GROUP BY
        U.id
    `;
    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario Obtenido:', user[0]);
                result(null, user[0]);
            }
        }

    )
}

User.findByEmail = (email, result) => {
    console.log('Por medio de findByEmail buscamos el usuario <================');
    const sql = `
    SELECT 
        U.id, 
        U.email, 
        U.name, 
        U.phone, 
        U.image, 
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON 
        UHR.id_rol = R.id
    WHERE 
        email = ?
    GROUP BY
        U.id
    `;
    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                // console.log('Usuario Obtenido  en =====>DB>>>>>>:', user[0]);
                result(null, user[0]);
            }
        }

    )
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
    INSERT INTO 
        users (
            email, 
            name,
            phone,
            image, 
            password,
            created_at,
            updated_at
            ) 
    VALUES (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            user.email,
            user.name,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = User;