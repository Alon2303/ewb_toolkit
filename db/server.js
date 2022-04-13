const express = require('express');
const server = express();
const logger = require('../utils/logger/logger');
const devJson = require('../configs/development.json');

const PORT = 3506


server.listen(PORT, () => {
    logger.debug(`Db server listening on port ${PORT}`, './logs/log.txt')
    console.log(`Db server listening on port ${PORT}`)
})