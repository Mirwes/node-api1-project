// const server = require('./api/server');

// const port = 5000;

// START YOUR SERVER HERE
const server = require("./api/server")

server.listen(5000, () => {
    console.log("Server started at localhost:5000.")
})