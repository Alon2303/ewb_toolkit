const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');

const PORT = 3502


server.listen(PORT, () => {
    logger.debug(`Reports server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Reports server listening on port ${PORT}`)
})