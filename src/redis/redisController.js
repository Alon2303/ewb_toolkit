const devConfig = require("../configs/development.json");
const redis = require("redis");
const client = redis.createClient();

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
