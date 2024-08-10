const express = require("express");
const router = express.Router();

const userDetails = {
  _id: '134567',
  firstName: 'Edith',
  lastName: 'IR',
  email: 'iredith0112@gmail.com'
}

router.post("/signup", (req, res) => {

  res.header('Authorization', 'sldxfgtiukhfwaejsdf');

  res.cookie('token', 'sluhtvngisuhofivjn', {
    sameSite: "None",
    secure: false,
    httpOnly: true,
  });

  res.status(201).json({
    user: userDetails,
  });
});

router.post("/login", (req, res) => {
  res.header('Authorization', 'sldxfgtiukhfwaejsdf');

  res.cookie('token', 'sluhtvngisuhofivjn', {
    sameSite: "None",
    secure: false,
    httpOnly: true,
  });

  res.status(200).json({ user: userDetails });
});

router.post("/logout", (req, res) => {
  res.clearCookie('token');

  res.removeHeader(Authorization);

  res.json({ message: "User Loggedout!", redirectUrl: "/login" });
});

router.get("/details", (req, res) => {
  const refreshToken = req.cookies['token'];

  if (refreshToken) {
    return res.status(200).json({ user: userDetails });
  } else {
    return res.status(401).json({ message: 'User not logged in', redirectUrl: '/login' });
  }
});

router.put("/update", (req, res) => {
  const accessToken = req.header('Authorization');

  if (accessToken) {
    res.json({ message: "User details updated", user: userDetails });
  } else {
    return res.status(401).json({ message: 'User not logged in', redirectUrl: '/login' });
  }
});

router.delete("/delete", (req, res) => {
  res.clearCookie('token');

  res.removeHeader('Authorization');

  res.json({ message: "User deleted!", redirectUrl: "/signup" });
});

module.exports = router;
