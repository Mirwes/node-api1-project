// BUILD YOUR SERVER HERE
const express = require("express")
const cors = require('cors');
const database  = require("./users/model")

const server = express()

server.use(express.json());
server.use(cors());

// get array of all user objects

server.get('/api/users', (req, res) => {
    database.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json({
           errorMessage: "The users info couln't be retrieved."})
    });
});







module.exports = server // EXPORT YOUR SERVER instead of {}