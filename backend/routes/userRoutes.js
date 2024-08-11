const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.post("/signup", UserController.createNewUser);

router.post("/login", UserController.loginUser);

router.post("/logout", authenticate, UserController.logoutUser);

router.get("/details", authenticate, UserController.getUserDetails);

router.put("/update", authenticate, UserController.updateUserDetails);

router.delete("/delete", authenticate, UserController.deleteUserDetails);

module.exports = router;
