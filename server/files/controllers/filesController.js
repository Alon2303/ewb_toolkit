const AWS = require('aws-sdk')
const logger = require('../../utils/logger/logger');

const LOG_PATH = './logs/log.txt'
const S3_BUCKET ='ewb-test-bucket';
const REGION ='eu-west-1';
const FOLDER ='BGU/';
const TEST_FILE = './testfile.jpg';

AWS.config.update({
    accessKeyId: 'AKIAYM6DJEGTGRHNNJQH',
    secretAccessKey: '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'
})

const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})


// const uploadFile = async (file) => {
//     const params = {
//         Body: file,
//         Bucket: S3_BUCKET,
//         Key: FOLDER+TEST_FILE.substring(2)
//     };

//     s3.upload(params)
//         .on('httpUploadProgress', (evt) => {
//             console.log(Math.round((evt.loaded / evt.total) * 100),'%');
//         })
//         .send((err, data) => {
//             if (data){
//                 logger.debug('Successfully uploaded a new file. ETag: '+data.ETag, LOG_PATH);
//                 //TODO - Insert new eTag + metadata to Files-Metadata DB
//             }
//             if (err) {
//                 console.log(err)
//             }
//         })
// }

const createSignedUrl = async (method, fileName) => {
    const params = {
        Key: fileName,
        Expires: 120 // In seconds
      }
    var url = s3.getSignedUrl(method == 'get' ? 'getObject' : 'putObject', params);
    console.log('The URL is', url);
    return url; 
}

const listFiles = async (folder) =>{
    var params = {
        Prefix: folder  //folder name
      };
    var files = await s3.listObjectsV2(params, function(err, data) {
        if (err) 
            console.log(err, err.stack); // an error occurred
        // else{    
        //     console.log(data.Contents.map(file => file.Key))
        // }
    }).promise();
    const fileNames = files.Contents.map(file => file.Key);
    return fileNames;
}

// module.exports.uploadFile = uploadFile;
module.exports.createSignedUrl = createSignedUrl;
module.exports.listFiles = listFiles;
// module.exports.signedPutUrl = signedPutUrl;