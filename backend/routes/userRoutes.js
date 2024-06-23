const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');
const { authenticate } = require("../middleware/auth");

router.get('/user-details', authenticate, UserController.getUserDetails);
router.put('/user-details/update', authenticate, UserController.updateUserDetails);
router.post('/signup', UserController.createNewUser);
router.post('/login', UserController.loginUser);
router.post('/logout', authenticate, UserController.logoutUser);
router.delete('/user-details/delete', authenticate, UserController.deleteUserDetails);

module.exports = router;
