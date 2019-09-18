const express = require("express");
const router = express.Router();

const Users = require("./userModel.js");
const middleware = require("../auth/restrictedMidware.js");

// router.get("/users", validator, (req, res) => {

// })


module.exports = router;