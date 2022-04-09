const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');
const user = require('./routes/user');

const PORT = 3504

server.use('/user', user);
server.get('/test', (req, res) => {console.log("test"); res.send("test")})


server.listen(PORT,() => {
    logger.debug(`User server listening on port ${PORT}`, './logs/log.txt')
    console.log(`User server server listening on port ${PORT}`)
})