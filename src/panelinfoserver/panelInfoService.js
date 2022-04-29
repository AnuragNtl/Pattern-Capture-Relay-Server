const types = require("./types");
const mysql = require("mysql");

function getConnection({host, user, password}) {
    const con = mysql.createConnection({
        host,
        user,
        password
    });
}










