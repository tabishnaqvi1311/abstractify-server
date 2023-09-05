require("dotenv").config();
const User = require("../models/User");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//TODO: Seperate mail sender
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});
//TODO: break down into functions, try middleware
//TODO: use jwt in login ans signup
const signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.status(400).json("fill cannot be empty");

    if (!validator.isEmail(email)) return res.status(400).json("enter valid email");

    if (!validator.isStrongPassword(password)) return res.status(400).json("weak password");

    if (username.length < 5) return res.status(400).json("username < 5 char!");

    const doesEmailAlreadyExist = await User.findOne({ email });

    if (doesEmailAlreadyExist) return res.status(400).json("email already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        const newUser = await User.create({
            email: email,
            username: username,
            password: hash,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, { expiresIn: "2d" });

        return res.status(201).json({ newUser, token });
    } catch (error) {
        return res.status(500).json("internal server error");
    }
}



const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json("fields cannot be empty");

    const doesUsernameExist = await User.findOne({ username });
    if (!doesUsernameExist) return res.status(404).json("user does not exist");

    const doPasswordsMatch = await bcrypt.compare(password, doesUsernameExist.password);
    if (!doPasswordsMatch) return res.status(400).json("incorrect password");

    const token = jwt.sign({ userId: doesUsernameExist._id }, process.env.SECRET, { expiresIn: "2d" });

    return res.status(200).json({ token });
}




const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const doesEmailAlreadyExist = await User.findOne({ email });
    if (!doesEmailAlreadyExist) return res.status(404).json("email not found");

    const payload = {
        email: email,
        id: doesEmailAlreadyExist._id
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "15min" });

    const link = `http://localhost:3000/reset-password/${payload.id}/${token}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Your Account Password",
        text: `We've received a request to reset the password for your Abstractify account. If you didn't make this request, you can safely ignore this email:  Your password will remain unchanged.

        To reset your password, please follow the link below:
        
        ${link}
        
        This link will expire in 15 minutes for security reasons, so make sure to use it promptly.
        
        If you're having trouble with the link or need further assistance, please don't hesitate to contact our support team at [Support Email Address].
        
        To ensure you receive future emails from us, please add ABSTRACTIFY to your email's safe sender list or address book.
        
        Thank you for being a valued member of Abstractify. We're here to help if you have any questions or concerns.`
    }


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).json({ "failed to send email": error.message });
        return res.status(200).json("email sent");
    })
}
//TODO check if password is really being updated or not
const resetPassword = async (req, res) => {
    const { _id } = req.params;
    const { password, repeatPassword } = req.body;

    if (password !== repeatPassword) return res.status(400).json({ error: "passwords must match!" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id },
            { password: hash },
        )
        return res.status(201).json("User updated");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Internal server error");
    }
}


module.exports = { signupUser, loginUser, forgotPassword, resetPassword };