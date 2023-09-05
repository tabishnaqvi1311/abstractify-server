const express = require("express");
const { signupUser, loginUser, forgotPassword, resetPassword } = require("../controller/userController");
const validateResetLink = require("../middleware/validateResetLink");
const User = require("../models/User");
const router = express.Router();

//get all users
router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
});
//login route
router.post("/login", loginUser);
//signup route
router.post("/signup", signupUser);
//forgot password route
router.post("/forgotPassword", forgotPassword);
//reset password route
//TODO: TEST THE MIDDLEWARE ONCE THE CLIENT IS IMPLEMENTED
router.post("/resetPassword/:id/:token", resetPassword);
//get one user
// router.get();

module.exports = router;