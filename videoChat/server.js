const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');

const PORT = 3505


server.listen(PORT, () => {
    logger.debug(`Video chat server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Video chat server listening on port ${PORT}`)
})