const express = require("express");
const { forgotPassword, loginUser, signupUser } = require("../controller/userController");
const router = express.Router();

//login route
router.post("/login", loginUser);
//signup route
router.post("/signup", signupUser);
//forgot password route
router.post("/forgotPassword", forgotPassword);
//reset password route
router.get();
//also reset password router
router.post();
//get all users
router.get();
//get one user
router.get();

module.exports = router;