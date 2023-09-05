const mongoose = require("mongoose");

const connectToMongoDB = (uri) => {
    return mongoose.connect(uri);
};

module.exports = connectToMongoDB;