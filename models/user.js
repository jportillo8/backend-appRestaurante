const db = require('../config/config');
const User = {};

User.create = (user, result) => {

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
            user.password,
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