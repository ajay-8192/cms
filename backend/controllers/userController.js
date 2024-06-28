const bcrypt = require('bcryptjs');

const User = require('../models/user');

const {
  DAYS_IN_WEEK,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE
} = require('../constants/timeConstants');

const { TOKEN } = require('../services/token');
const { TOKEN_CONSTANTS } = require('../constants/tokenConstants');
const { redisClient } = require('../config/redis');

// Create new User
exports.createNewUser = async (req, res) => {
  try {
    
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists', redirectUrl: '/login' });
    }

    const { email, password, name } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(user);

    const accessToken = TOKEN.generateAccessToken(newUser);
    const refreshToken = TOKEN.generateRefreshToken(newUser);

    newUser.token = accessToken;

    await newUser.save();

    res.header(TOKEN_CONSTANTS.AUTHORIZATION, accessToken);

    res.cookie(TOKEN_CONSTANTS.TOKEN,
      refreshToken,
      {
        sameSite: 'None',
        secure: false,
        httpOnly: true
      }
    );

    const { password: _, ...userDetails } = newUser.toObject();

    res.status(201).json({
      user: userDetails
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login Controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist', redirectUrl: '/signup' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: 'Invalid Password' });
    }

    const accessToken = TOKEN.generateAccessToken(user);
    const refreshToken = TOKEN.generateRefreshToken(user);

    user.token = accessToken;

    res.header('Authorization', accessToken);

    res.cookie('token',
      refreshToken,
      {
        sameSite: 'Lax',
        secure: false,
        httpOnly: true
      }
    );

    const { password: _, ...userDetails } = user.toObject();

    res.json({ user: userDetails });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Details
exports.getUserDetails = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', returnUrl: '/signup' });
    }

    const { password: _, ...userDetails } = user.toObject();

    res.json({ user: userDetails });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = req.header(TOKEN_CONSTANTS.AUTHORIZATION);

    if (accessToken) {
      TOKEN.blacklistAccessToken(accessToken);
    }

    await redisClient.del(user.id);

    res.clearCookie(TOKEN_CONSTANTS.TOKEN);

    res.removeHeader(TOKEN_CONSTANTS.AUTHORIZATION);

    res.json({ message: 'User Loggedout!', redirectUrl: '/login' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {

  const { email, password, name } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', redirectUrl: '/signup' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    const { password: _, ...userDetails } = user.toObject();

    res.json({ message: 'User details updated', user: userDetails });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserDetails = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', redirectUrl: '/signup' });
    }

    await User.findByIdAndDelete(req.user.id);

    const accessToken = req.header(TOKEN_CONSTANTS.AUTHORIZATION);

    if (accessToken) {
      TOKEN.blacklistAccessToken(accessToken);
    }

    await redisClient.del(user.id);

    res.clearCookie(TOKEN_CONSTANTS.TOKEN);

    res.removeHeader(TOKEN_CONSTANTS.AUTHORIZATION);

    res.json({ message: 'User deleted!', redirectUrl: '/signup' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
