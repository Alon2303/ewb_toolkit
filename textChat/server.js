const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');

const PORT = 3503


server.listen(PORT, () => {
    logger.debug(`Text chat server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Text chat server listening on port ${PORT}`)
})