const mysql = require('mysql');


// const db = mysql.createConnection({
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'market_flutter'
});
console.log('Primero configurar la conexión a la base de datos');

db.getConnection((err) =>  {
    console.log('Conecto a la base de datos');
    if(err) throw err;
    console.log('DATABASE CONNECTED!!');
});

module.exports = db;