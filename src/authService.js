const jwt = require("jsonwebtoken");
const userDB = require("./userDB.js");

function generateJwt({tokenSecret, tokenExpiresIn}, user) {
    return jwt.sign(user, tokenSecret, {expiresIn: tokenExpiresIn});
}

function validateJwt({tokenSecret}, token) {
    let details = jwt.decode(token, {});
    return details.sub;
}

module.exports = function(config) {
    return {
        verifier: (req, res, next) => {
            next();
        },
        generator: (req, res) => {

            let userName = req.body.userName, password = req.bofy.password;
        }
        };
};

