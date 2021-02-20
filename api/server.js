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

//Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    database.update(req.params.id, req.body)
    .then(userID => {
        if (!userID) {
            res.status(404).json({
                message: "The user with the specified ID does not exist." })
        } else if (!req.body.name || !req.body.bio){
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user." });
        } else{
            database.findById(userID)
            .then(user => {
                res.status(200).json(user);
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    errorMessage: "The user info could not be retrieved." })
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user info could not be modified."})
    });
});
//creates a user using the info sent inside the request boy.
server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user." })
    } else {
        database.insert(req.body)
        .then(userIDObj => {
            //returns an object containing the id of the user just created.
            res.status(201).json(userIDObj);
        }).catch(err =>{
            console.log(err);
            res.status(500).json({
                errorMessage: "oops"});
        });
    }
});






module.exports = server // EXPORT YOUR SERVER instead of {}