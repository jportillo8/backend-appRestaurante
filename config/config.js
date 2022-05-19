const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'market_flutter'
});

db.connect( (err) => {
    if(err) throw err;
    console.log('DATABASE CONNECTED!!');
});

module.exports = db;