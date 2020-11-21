// Define the mysql pool constant that will ne used to connect to the database

const mysql = require('mysql');
const fs = require('fs');

// get secret info
var array = fs.readFileSync('./info.txt').toString().split("\n");

//pool
var pool = mysql.createPool({
    connectionLimit : 100, //important
    host: array[0],
    user: array[1],
    password: array[2],
    database: array[3],
    debug    :  false
});

// export
module.exports = pool
