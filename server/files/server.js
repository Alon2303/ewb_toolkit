const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');

const PORT = 3501


server.listen(PORT, () => {
    logger.debug(`Files server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Files server listening on port ${PORT}`)
})