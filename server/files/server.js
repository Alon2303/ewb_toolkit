const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');
var bodyParser = require('body-parser')
const files = require('./routes/files')
require('dotenv').config();

const PORT = 3501

server.use(bodyParser.urlencoded({
    extended: true
  }));

server.use(bodyParser.json());

server.use(function(req, res, next) {
    console.log(req.body)
    next();
});
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

server.use('/', files);

server.listen(PORT, () => {
    logger.debug(`Files server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Files server listening on port ${PORT}`)
})