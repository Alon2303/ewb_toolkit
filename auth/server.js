const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');

const PORT = 3500


server.listen(PORT, () => {
    logger.debug(`Authentication server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Authentication server listening on port ${PORT}`)
})