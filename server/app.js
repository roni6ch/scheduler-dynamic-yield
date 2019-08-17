const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const mongoose = require("./configuration/mongooseConfig");
const routes = require("./routes");

let app = express(); // Initialize express configuration
mongoose(); //Initialize mongoose configuration

app.use( bodyParser.json() ); 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    next();
});

app.use(routes);
const port = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(port);

console.log("listening on port " + port);
