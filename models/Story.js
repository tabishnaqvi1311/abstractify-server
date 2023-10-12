const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    chapters: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Chapter"
    }],
    genre: String
});

module.exports = mongoose.model("Story", storySchema);
