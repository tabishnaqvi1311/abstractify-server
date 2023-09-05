require("dotenv").config();
const User = require("../models/User");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//TODO: Seperate mail sender
const nodemailer = require("nodemailer");
//TODO: break down into functions, try middleware
//TODO: use jwt in login ans signup
const signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.status(400).json("fill cannot be empty");

    if (!validator.isEmail(email)) return res.status(400).json("enter valid email");

    if (!validator.isStrongPassword(password)) return res.status(400).json("weak password");

    if(username.length < 5) return res.status(400).json("username < 5 char!");

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

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json("internal server error");
    }
}



const loginUser = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password) return res.status(400).json("fields cannot be empty");

    const doesUsernameExist = await User.findOne({username});
    if(!doesUsernameExist) return res.status(404).json("user does not exist");

    const doPasswordsMatch = await bcrypt.compare(password, doesUsernameExist.password);
    if(!doPasswordsMatch) return res.status(400).json("incorrect password");

    return res.status(200).json("user logged in");
}




const forgotPassword = async(req, res) => {
    const {email} = req.body;

    const doesEmailAlreadyExist = await User.findOne({email});
    if(!doesEmailAlreadyExist) return res.status(404).json("email not found");
    
    const payload = {
        email: email,
        id: doesEmailAlreadyExist._id
    }
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "15min"});

    const link = "link goes here with token and id";


    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Your Account Password",
        text: link
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return res.status(500).json({"failed to send email": error.message});
        return res.status(200).json("email sent");
    })
}

const resetPassword = async(req, res) => {

}

module.exports = { signupUser, loginUser, forgotPassword };