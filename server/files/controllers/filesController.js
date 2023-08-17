const fs = require('fs');
const path = require('path');


const LOCAL_FOLDER = path.join(__dirname, 'db');

const listFiles = async (folder) => {
    const folderPath = path.join(LOCAL_FOLDER, folder);
    
    try {
        const items = await fs.promises.readdir(folderPath);
        
        const files = [];
        const folders = [];

        for (const item of items) {
            const itemPath = path.join(folderPath, item);
            const stat = await fs.promises.stat(itemPath);

            if (stat.isFile()) {
                files.push(item);
                // console.log('File:', item);
            } else if (stat.isDirectory()) {
                folders.push(item);
                // console.log('Directory:', item);
            }
        }

        return { files, folders };
    } catch (error) {
        console.error('Error listing files:', error);
        return { files: [], folders: [] };
    }
};



const listFilesFromSubdirectory = async (subdirectory) => {
    console.log('Listing files from subdirectory:', subdirectory);

    return await listFiles(subdirectory);
};

const createSignedUrl = async (method, fileName) => {
    const filePath = path.join(LOCAL_FOLDER, fileName);
    // Generate a signed URL or handle file read/write as needed
    // ...
};

const deleteByKey = async (Key) => {
    const filePath = path.join(LOCAL_FOLDER, Key);
    
    try {
        await fs.promises.unlink(filePath);
        console.log('File deleted:', Key);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};



const deleteFile = async (filePath) => {
    try {
        fs.unlink(filePath, (error) => {
            if (error) {
                console.error('Error deleting file:', error);
                // Handle the error and send an appropriate response
            } else {
                console.log('File deleted successfully');
                // Send a success response
                console.log('File deleted:', filePath);
            }
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        // Handle the error and send an appropriate response
        
    }
};




// Define the fileExists function
function fileExists(filePath) {
    console.log('Checking if file exists:', filePath);
    console.log('Exists:', fs.existsSync(filePath));
    return fs.existsSync(filePath);
}

module.exports.listFiles = listFiles;
module.exports.listFilesFromSubdirectory = listFilesFromSubdirectory;
module.exports.createSignedUrl = createSignedUrl;
module.exports.deleteByKey = deleteByKey;   
module.exports.LOCAL_FOLDER = LOCAL_FOLDER;
module.exports.fileExists = fileExists;
module.exports.deleteFile = deleteFile;
