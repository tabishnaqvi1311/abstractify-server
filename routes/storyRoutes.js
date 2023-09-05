const express = require("express");
const { getAllStories, getStory } = require("../controller/storyController");
const router = express.Router();

//get all stories - with pagination - anyone can do this
router.get("/getAllStories", getAllStories);
//get one storie - anyone can do this
router.get("getStory/:id", getStory);
//create a story
router.post();
//update a story - only creator and collaborators can do this
router.put();
//delete a story - only creator can do this
router.delete();

module.exports = router;