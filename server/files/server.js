const express = require('express');
const path = require('path');
const { LOCAL_FOLDER } = require('./controllers/filesController');
const server = express();
const logger = require('../utils/logger/logger');
var bodyParser = require('body-parser');
const files = require('./routes/files');
const filesController = require('./controllers/filesController');
require('dotenv').config();

const PORT = 3501;

server.use(bodyParser.urlencoded({
    extended: true,
}));

server.use(bodyParser.json());

server.use(function(req, res, next) {
    // console.log(req.body);
    next();
});
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Route to list files and folders from a subdirectory
server.get('/list/*', async (req, res) => {

    console.log('Request to list files from subdirectory:', req.params[0]);
    const subdirectory = decodeURIComponent(req.params[0]); // Decode the subdirectory name
    try {
        console.log('Listing files for subdirectory:', subdirectory);
        const result = await filesController.listFilesFromSubdirectory(subdirectory);
        console.log('Result:', result);
        res.json(result);
    } catch (error) {
        console.error('Error listing files from subdirectory:', error);
        res.status(500).json({ error: error.message });
    }
});
    



server.use('/', files);





server.listen(PORT, () => {
    logger.debug(`Files server listening on port ${PORT}`, './logs/log.txt');
    console.log(`Files server listening on port ${PORT}`);
});
