const express = require("express");
const router = express.Router();

const Users = require("./userModel.js");
const middleware = require("../auth/restrictedMidware.js");

router.get("/", (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.send(err))
})


module.exports = router;