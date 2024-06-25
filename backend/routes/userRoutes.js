const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');
const { authenticate } = require("../middleware/auth");

router.post('/signup', UserController.createNewUser);
router.post('/login', UserController.loginUser);
router.put('/user-details/update', authenticate, UserController.updateUserDetails);
router.get('/user-details', authenticate, UserController.getUserDetails);
router.post('/logout', authenticate, UserController.logoutUser);
router.delete('/user-details/delete', authenticate, UserController.deleteUserDetails);

module.exports = router;
