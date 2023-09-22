const jwt = require("jsonwebtoken");

const validateResetLink = async (req, res, next) => {
    const {id, token} = req.params;

    const isUserIdValid = await User.findById({_id: id});
    if(!isUserIdValid) return res.status(401).json("Unauthorized");

    const isTokenValid = jwt.verify(token, process.env.SECRET);
    if(isTokenValid.id !== id) return res.status(400).json("Token does not match or has expired!");

    next();
}

module.exports = validateResetLink;