const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema);