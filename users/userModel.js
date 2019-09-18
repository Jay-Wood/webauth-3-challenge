const db = require("../database/dbConfig.js");

module.exports = {
    getUsers, 
    getById,
    add
}

function getUsers() {
    return db("users")
}

function getById(id) {
    return db("users")
        .where("id", id)
        .first();
}

function add(user) {
    return db("users")
        .insert(user)
        .then(id => {
            console.log("id", id)
            return (getById(id[0]))
        })
}