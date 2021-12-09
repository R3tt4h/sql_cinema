'use strict';

const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '755238266guilty',
    database: 'sql_cinema'
});

dbConn.connect(function(err) {
    if(err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConn;