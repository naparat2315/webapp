const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: 'projectc'
});

conn.connect();

module.exports = conn;