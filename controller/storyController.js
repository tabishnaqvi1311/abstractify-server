const Chapter = require("../models/Chapter");
const Story = require("../models/Story");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getAllStories = async (req, res) => {
    //TODO: add pagination
    const stories = await Story.find({});
    return res.status(200).json(stories);
}

const getStory = async (req, res) => {
    const { id } = req.params
    const story = await Story.findOne({ id: id });
    if (!story) return res.status(404).json("story not found");

    return res.status(200).json(story);
}

const postStory = async (req, res) => {
    const { title, author, genre, initialChapterTitle, initialChapterContent } = req.body;
    //validate user
    //test controller
    if (!title || !author || !genre) return res.status(400).json("Fill in the fields");


    const authorId = await User.findById(author);
    if (!authorId) return res.status(404).json("No user with that id found!");

    try {
        const story = new Story({
            title,
            author: authorId._id,
            genre
        });

        await story.save();

        if (initialChapterTitle) {
            const initialChapter = new Chapter({
                title: initialChapterTitle,
                content: initialChapterContent,
                story: story._id,
                author: authorId._id
            });
            await initialChapter.save();

        }

        return res.status(201).json({ story: story });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message, TypeError: "Internal Server Error" });
    }
}

const updateStory = async (req, res) => {
    //update title, private/public, to bo done when i do the client
}

const deleteStory = async (req, res) => {
    //delete a chapter and all related chapters as well
    const {id} = req.params;

    //search if it exists
    const doesItExist = await Story.findById(id);
    if(!doesItExist) return res.status(404).json("story not found, can't delete");

    //if exists
    //get current user that sent the request
    //from the bearer token in the headers
    //and match it with the author of the story,
    //if they two match, delete and return success, else return error
    const token = req.headers["auth-token"];
    //no need to check if token exists or not, we did that in middleware
    try{
        const data = jwt.verify(token, process.env.SECRET);
        if(data.userId !== doesItExist.author.toString()) return res.status(403).json("Only the author can delete the story!");

        //they matched!
        await Story.findByIdAndDelete(id);
        return res.status(200).json("deleted");

    }catch(e){
        console.log(e.message);
        return res.status(500).json("internal server error");
    }

}

module.exports = { getAllStories, getStory, postStory, deleteStory };