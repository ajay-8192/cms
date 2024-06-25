const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // const token = req.header('Authorization');
  const token = req.cookies['auth-token'];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
