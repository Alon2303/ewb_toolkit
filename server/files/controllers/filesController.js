const AWS = require('aws-sdk')
const logger = require('../../utils/logger/logger');
require('dotenv').config();

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const accessKeyId =  process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey
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
        Expires: 10 // TTL (seconds)
    }
    var url = s3.getSignedUrl(method == 'get' ? 'getObject' : 'putObject', params);
    console.log('The URL is', url);
    return url; 
}

const listFiles = async (folder) =>{
    var params = {
        Prefix: folder  //folder name
    };
    // var files = await s3.listObjectsV2(params).promise();
    // const fileNames = files.Contents.map(file => file.Key);
    return ['Yearly Summary-2021.jpg', 'Trip Summary.txt', 'Yearly Summary-2020.jpg', 'Yearly Summary-2022.jpg'];//fileNames;
}

const deleteByKey = async (Key) => {
    console.log('deleting', Key)
    var deleted = s3.deleteObject({Key}).promise();
    console.log(deleted);
    return deleted;
}

// module.exports.uploadFile = uploadFile;
module.exports.createSignedUrl = createSignedUrl;
module.exports.listFiles = listFiles;
module.exports.deleteByKey = deleteByKey;
// module.exports.signedPutUrl = signedPutUrl;