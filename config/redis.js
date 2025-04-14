const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Ansluten till Redis');
});

client.on('error', (err) => {
  console.error('Redis-fel:', err);
});

module.exports = client;
