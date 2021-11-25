const devConfig = require("../configs/development.json");

class RedisClient {

constructor () {
 console.log(devConfig);

}

set(){}

get(){}

setexp(){}

del(){}

}

module.exports = new RedisClient()
