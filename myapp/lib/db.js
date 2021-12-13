const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asd97979',
    database: 'opentutorials'
});
db.connect();

module.exports = db;