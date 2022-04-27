const { createClient } = require('redis');

const getRedisClient = async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  return client;
};

module.exports = {
    getRedisClient
}