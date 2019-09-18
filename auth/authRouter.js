const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const secrets = require("../config/secrets.js");
const Users = require("../users/userModel.js");
const middleware = require("../auth/restrictedMidware.js");
const session = require('express-session')

router.post("/register", (req, res) => {
    let user = req.body;
    const hashed = bcrypt.hashSync(user.password, 12);
    user.password = hashed;
    const token = generateToken(user);

    Users.add(user)
        .then(user => {
            req.session.user = user;
            res.status(200).json( { user, token })
        })
        .catch(error => {
            res.status(500).json( {message: `Error adding new user: ${error}`} );
        });
})

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    
    Users.getByName({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                // req.session.user = user;
                console.log(" req.session  ",  req.session)
                res.status(200).json({ token, user, message: `Welcome, ${user.username} from ${user.department}!`})
            } else {
                res.status(401).json({message: "Invalid credentials."})
            }
        })
        .catch(err => {
            res.status(500).json( { message: `There was a problem accessing the server: ${err}` })
        })
})


function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department
    }
    
    const options = {
        expiresIn: "10d"
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = router;