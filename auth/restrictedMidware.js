const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Users = require('../users/userModel.js');
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("token in midware: ", token)

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log("error", err)
                res.status(401).json({ message: "You need a JWT!" })
            } else {
                console.log("decodedTkn: ", decodedToken)
                req.user = { username: decodedToken.username, department: decodedToken.department}
                console.log("req.user, ", req.user)
                next()
            }
        })
    } else {
        res.status(400).json({ message: 'No credentials provided' });
    }

}