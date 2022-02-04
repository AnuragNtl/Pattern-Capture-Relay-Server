const jwt = require("jsonwebtoken");
const userDB = require("./userDB.js");

function generateJwt({tokenSecret, tokenExpiresIn}, user) {
    jwt.sign(user, tokenSecret, {expiresIn: tokenExpiresIn});
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

