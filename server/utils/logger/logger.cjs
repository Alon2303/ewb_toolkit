//TODO: log file rotation every week || save logs to db
const fs = require('fs'); 

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

//define the time format
function getTime() {
    let now = new Date();
    return now.toUTCString();
}

function doLog(line, level='Debug', path) {
    line = `${getTime()} | ${level} | ${line}\n` 
    console.log('doLog', line);
    fs.appendFileSync(path, line);
}

module.exports = {
    debug(line, path){
        doLog(line, "Debug", path)
    },
    info(line, path){
        doLog(line, "Info", path)
    },
    warn(line, path){
        doLog(line, "Warn", path)
    },
    error(line, path){
        doLog(line, "Error", path)
    }
}