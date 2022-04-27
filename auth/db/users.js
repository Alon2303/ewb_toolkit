const logger = require("../../utils/logger/logger");
const { getRedisClient } = require("../../utils/redis/redis");
const { saltHash } = require("../../utils/utils");


//TODO: Hash + salt user passwords. If the user exist compare password(after hashing)
const authUser = async (user) => {

 
  
};



module.exports = { authUser };
