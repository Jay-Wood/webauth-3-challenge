const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const secrets = require("../config/secrets.js");
const Users = require("../users/userModel.js");
const middleware = require("../auth/restrictedMidware.js");

router.post("/register", (req, res) => {
    let user = req.body;
    const hashed = bcrypt.hashSync(user.password, 12);
    // console.log("hashed ", hashed)
    user.password = hashed;
    console.log("user", user)
    const token = generateToken(user);
    console.log("token: ", token)

    Users.add(user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json(`Error adding new user: ${error}`);
        });
})

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const secret = "super duper secret!"
    const options = {
        expiresIn: "10d"
    }

    return jwt.sign(payload, secret, options)
}


module.exports = router;