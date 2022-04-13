const logger = require('../../utils/logger/logger');
const devJson = require('../../configs/development.json');
const { getUser } = require('../db/users');

const authUser = async (req, res) => {
  try {
    userServerAddress = devJson.servers_addresses.user;
    const userFullDetails = await axios.get(`${userServerAddress}/user/getUser`)// add req.user.email query params
    const ifUserExist = getUser(req.user.email);
    if (ifUserExist) {
      res.send({ user });
    } else {
      logger.error(`Error at auth/controller/authUser: ${error}`);
      res.status(403).send("User does not exist");
    }
  } catch (error) {
    logger.error(`Error at auth/controller/authUser: ${error}`);
    res.status(500).send(`Server Error ${error}`);
  }
};

module.exports = { authUser };
