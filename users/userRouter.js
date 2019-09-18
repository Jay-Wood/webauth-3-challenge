const express = require("express");
const router = express.Router();
const restricted = require("../auth/restrictedMidware.js");
const Users = require("./userModel.js");
const middleware = require("../auth/restrictedMidware.js");

router.get("/", restricted, (req, res) => {
    console.log("req.user.dept", req.user.department)
    Users.getUsers()
        .then(users => {
            res.status(200).json({users, loggedInUser: req.user.username, userDept: req.user.department })
        })
        .catch(err => res.send(err))
})


module.exports = router;