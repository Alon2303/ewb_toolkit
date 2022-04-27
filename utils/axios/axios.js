const axios = require("axios");
const { services_addresses } = conf;
const conf = require("../../configs/development.json");

const getAxiosInstance = (service) => {
  return axios.create({
    baseURL: services_addresses[service],
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
  });
};

module.exports = {
    getAxiosInstance
}
