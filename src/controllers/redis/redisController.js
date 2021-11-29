const devConfig = require("../configs/development.json");
const redis = require("redis");
const client = redis.createClient();

class RedisClient {

constructor () {
 console.log(devConfig);

}

set(key, value){
	client.set(key, value, redis.print);
}

get(){
	client.get(key, redis.print);

}

setexp(){}

del(){}

}

module.exports = new RedisClient()
