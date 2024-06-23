const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id // Assuming user has an id field
      // Add any other user information you want to include in the token payload
    }
  };

  // Sign the token with a secret key and set an expiration time
  return jwt.sign(payload, 'SECRET_KEY', { expiresIn: '1h' });
};

module.exports.generateToken = generateToken;
