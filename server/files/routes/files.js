const AWS = require('aws-sdk')
const express = require('express');
const path = require('path');
const prompts = require('prompts');
const { LOCAL_FOLDER } = require('../controllers/filesController');

const router = express.Router();
const fs = require('fs')
const logger = require('../../utils/logger/logger');
const filesController = require("../controllers/filesController");
// const { getUser } = require('../../auth/db/users');

const LOG_PATH = './logs/log.txt'
const S3_BUCKET = 'ewb-test-bucket';
const REGION = 'eu-west-1';
const FOLDER = 'BGU/';
const TEST_FILE = './large_test.mp4';

const multer = require('multer');

const storage = multer.memoryStorage();  // Store file data in memory as buffer
const upload = multer({ storage: storage });

// Returns a specific file for download
router.get('/download/*', async (req, res) => {
    console.log('download file');
    const fileName = req.params[0]  ;
    console.log('fileName', fileName);
    try {
        const filePath = path.join(LOCAL_FOLDER, fileName);
        console.log('Downloading file:', filePath);
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found.' });
        }
    } catch (error) {
        console.error('Error occurred while downloading:', error);
        res.status(500).json({ error: 'Failed to download the file.' });
    }
});

// Returns a specific file's signed URL
router.get('/signed-url/:filename', async (req, res) => {
    const fileName = req.params.filename;
    try {
        const signedUrl = await filesController.createSignedUrl('get', fileName);
        res.send(signedUrl);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ error: 'Failed to generate signed URL.' });
    }
});


// ... Your existing imports ...

// Returns a specific file for preview
router.get('/content/*', async (req, res) => {
    const filename = req.params[0]; // Extract the filename from the URL
    console.log('filename', filename);

    try {
        const filePath = path.join(LOCAL_FOLDER, filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            const stream = fs.createReadStream(filePath);
            
            // Set appropriate response headers for streaming
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

            // Pipe the file stream to the response
            stream.pipe(res);
        } else {
            res.status(404).json({ error: 'File not found.' });
        }
    } catch (error) {
        console.error('Error occurred while streaming file content:', error);
        res.status(500).json({ error: 'Failed to stream the file content.' });
    }
});




router.post('/upload/*', upload.single('file'), async (req, res) => {
    try {
        console.log('uploading file');
        console.log('req.file', req.file);
        // Check if the file exists
        const fileName = decodeURIComponent(req.file.originalname); // Get the file name

        console.log('params   sfsdfdsfsdfdsfsdf', req.params);

        const subdirectory = req.params[0] || ''; // If no subdirectory provided, default to empty string

        const location = path.join(LOCAL_FOLDER, subdirectory, fileName);

        const overwrite = req.query.overwrite === 'true'; // Check if the 'overwrite' query parameter is set to 'true'


        const fileExists = await filesController.fileExists(location);


        if (fileExists && !overwrite) {
            console.log('File already exists');
            return res.json({
                message: 'File already exists',
                overwritePrompt: { name: fileName, location: location }
            });
        }
        else if (fileExists && overwrite) {
            console.log('File already exists, overwriting');
        }
        else {
            console.log('File does not exist');
        }

        fs.writeFileSync(location, req.file.buffer);

        //clear local buffer
        req.file.buffer = null;
        res.json({ message: 'File uploaded successfully' });
        res.end();


    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload the file.' });
    }
});


router.post('/delete', async (req, res) => {
    try {

        const filesToDelete = req.body; // An array of full file paths

        for (const filePath of filesToDelete) {
            const location = path.join(LOCAL_FOLDER, filePath);
            console.log('Deleting file:', location);
            // Delete the file
            await filesController.deleteFile(location);
        }

        res.json({ message: 'Files deleted successfully' });
        res.end();
    } catch (error) {
        console.error('Error deleting files:', error);
        res.status(500).json({ error: 'Failed to delete files.' });
    }
}); 

module.exports = router