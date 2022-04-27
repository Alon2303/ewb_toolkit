const logger = require("../../utils/logger/logger");
const { getAxiosInstance } = require("../../utils/axios/axios");
const { getRedisClient } = require("../../utils/redis/redis");
const config = require("../../configs/development.json");

const authUser = async (req, res) => {
  try {
    const {
      services_addresses: { user },
    } = config;
    const redisClient = await getRedisClient();
    const axiosInstance = getAxiosInstance("user");
    const userFullDetails = await axiosInstance.get(`${user}/user/getUser`);

    res.send(JSON.stringify(userFullDetails));

    //get back user object from users db (sql)
    // hash the password from the user || check if he has a token(redis)
    // if he has a valid token(expires in 5 hours) authenticate
    // if token expired use refresh token to generate new token, save email: hash in redis for 5 hours and authenticate
    // if user token invalid return 403
    // if user does not exist return 403

    //await redisClient.setEx(email, JSON.stringify({ username: email, userpass: hash }));
  } catch (error) {
    logger.error(`Error at auth/controller/authUser: ${error}`);
    res.status(500).send(`Server Error`);
  }
};

module.exports = { authUser };
