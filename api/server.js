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
//get user object by id
server.get('/api/users/:id', (req, res) => {
    database.findById(req.params.id).then(user => {
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID doesn't exist."});    
        } else {
            res.status(200).json(user);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            errormessage: "The user info could not be retrieved."
   });
  });
});






module.exports = server // EXPORT YOUR SERVER instead of {}