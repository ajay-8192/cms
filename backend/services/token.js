const jwt = require('jsonwebtoken');
const { redisClient } = require('../config/redis');
const { DAYS_IN_WEEK, HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_MINUTE } = require('../constants/timeConstants');

const generateAccessToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

const generateRefreshToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(payload, process.env.REFRESH_TOKEN);
  redisClient.set(user.id, token, 'EX', SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_WEEK);
  return token;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return reject(err);

      redisClient.get(decoded.user.id, (error, result) => {
        if (error) return reject(error);

        if (result === token) {
          resolve(decoded);
        } else {
          reject(new Error('Invalid Token'));
        }
      });
    });
  });
};

const blacklistAccessToken = (token) => {
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    const expiration = decoded.exp - Math.floor(Date.now() / 1000);
    redisClient.set(`blacklist_${token}`, token, 'EX', expiration);
  }
}

const isBlacklisted = token => {
  return new Promise((resolve, reject) => {
    redisClient.get(`blacklist_${token}`, (err, result) => {
      if (err) return reject(err);
      resolve(result !== null);
    });
  });
}

exports.TOKEN = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  blacklistAccessToken,
  isBlacklisted
};
