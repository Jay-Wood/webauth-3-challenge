const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const Users = require("../users/userModel.js");
const middleware = require("../auth/restrictedMidware.js");

// router.get("/users", validator, (req, res) => {

// })


module.exports = router;