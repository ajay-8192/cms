const User = require('../models/user');
const { generateToken } = require('../middleware/tokenGenerate');

const {
  DAYS_IN_WEEK,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE
} = require('../constants/timeConstants');

exports.getUserDetails = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.password = password || user.password;

    await user.save();

    res.json({ message: 'User details updated', user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserDetails = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.user.id);

    res.clearCookie('auth-token');

    res.removeHeader('Authorization');

    res.json({ message: 'User deleted!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    
    const newUser = new User(req.body);

    const token = generateToken(newUser);

    newUser.token = token;

    await newUser.save();

    res.header('Authorization', token);

    res.cookie('auth-token',
      token,
      {
        maxAge: DAYS_IN_WEEK * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * SECONDS_IN_MINUTE
      }
    );

    res.status(201).json({
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = generateToken(user);

    res.header('Authorization', token);

    res.cookie('auth-token',
      token,
      {
        maxAge: DAYS_IN_WEEK * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * SECONDS_IN_MINUTE
      }
    );

    res.json({ user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.clearCookie('auth-token');

    res.removeHeader('Authorization');

    res.json({ message: 'User deleted!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
