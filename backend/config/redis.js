const redis = require('ioredis');

const client = new redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
})

exports.redisClient = client;
