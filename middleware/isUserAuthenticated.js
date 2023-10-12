const jwt = require("jsonwebtoken");

const isUserAuthenticated = async(req, res, next) => {
    const token = req.headers['auth-token'];
    if(!token) return res.status(401).json("Unauthorized");
    //i think we should also check that token is valid below

    try{
        const data = jwt.verify(token, process.env.SECRET);
        req.user = data.userId;
        next();
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json("internal server error");
    }
}

module.exports = isUserAuthenticated;