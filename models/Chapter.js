const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: String,
    content: String,
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Chapter", chapterSchema);