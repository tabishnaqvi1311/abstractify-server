const Chapter = require("../models/Chapter");
const Story = require("../models/Story");
const User = require("../models/User");

const getAllStories = async(req, res) => {
    //TODO: add pagination
    const stories = await Story.find({limit: 10});
    return res.status(200).json(stories);
}

const getStory = async(req, res) => {
    const {id} = req.body
    const story = await Story.findOne({id: id});
    if(!story) return res.status(404).json("story not found");

    return res.status(200).json(story);
}

const postStory = async(req, res) => {
    const {title, genre, initialChapterTitle, initialChapterContent} = req.body;
    //get user id
    const id = 4; //just an example

    const author = User.findById(id);
    if(!author) return res.status(404).json("user not found with that id");

    //experimental code, proceed with caution
    //we need to create a chapter and link it to a story


}

const updateStory = async(req, res) => {
    //update title, private/public
}

const deleteStory = async(req, res) => {
    //delete a chapter and all related chapters as well
}

module.exports = {getAllStories, getStory};