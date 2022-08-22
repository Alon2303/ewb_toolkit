const AWS = require('aws-sdk')
const express = require('express');
const router = express.Router();
const fs = require('fs')
const logger = require('../../utils/logger/logger');
const filesController = require("../controllers/filesController");
// const { getUser } = require('../../auth/db/users');

const LOG_PATH = './logs/log.txt'
const S3_BUCKET ='ewb-test-bucket';
const REGION ='eu-west-1';
const FOLDER ='BGU/';
const TEST_FILE = './large_test.mp4';

// Returns the root folder content
router.get('/', async (req, res) => { 
    console.log('list files in bucket');
    var fileNames = await filesController.listFiles();
    res.send(fileNames)
})

// // Returns a list of all file ids inside a folder
// router.get('/:folder', async (req, res) => { 
//     res.header("Access-Control-Allow-Origin", "*");
//     const folder = req.params.folder;
//     console.log('list files in folder: ', folder);
//     var fileNames = await filesController.listFiles(folder);
//     res.send(fileNames)
// })

// Returns a specific file's Get url
router.get('/:filename', async (req, res) => { 
    console.log('get file', req.params);
    var key = req.params.filename;
    var url = await filesController.createSignedUrl('get', key); 
    res.send(url)
})

// Returns a specific file's Put url
router.post('/', async (req, res) => {
    console.log('upload file', req.body);
    var keys = req.body.fileKeys;
    var numberOfFiles = keys.length;
    var putUrls = {}
    for (var i = 0 ; i< numberOfFiles ; i++){
        var url = await filesController.createSignedUrl('put', keys[i]);
        putUrls[keys[i]] = url;
    }
    console.log(putUrls);
    res.send(putUrls) 
})

// Update a file
router.put('/:fileId', async (req, res) => {
    return '/TODO'
})

// Delete a file
router.delete('/:fileId', async (req, res) => {
    var deleted = await filesController.deleteByKey(req.params.fileId);
    console.log('Delete file ', req.params.fileId);
    res.send(deleted)
})


module.exports = router