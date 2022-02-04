const mysql = require("mysql");
const promisify = require("promisify");

function digest(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function UserDB({host, user, password, database}) {
    this.connection = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    this.query = promisify(this.connection.query);
}

UserDB.prototype.authenticate = function(username, password) {
    return this.query("select username from users where username = ? password = ?", [username, digest(password)]);
}


module.exports = (config) => new UserDB(config);

