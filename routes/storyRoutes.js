const express = require("express");
const { getAllStories, getStory, postStory, deleteStory, updateStory } = require("../controller/storyController");
const isUserAuthenticated = require("../middleware/isUserAuthenticated");
const router = express.Router();

//get all stories - with pagination - anyone can do this
router.get("/getAllStories", getAllStories);
//get one storie - anyone can do this
router.get("/getStory/:id", getStory);
//create a story
router.post("/createStory", isUserAuthenticated, postStory);
//update a story - only creator and collaborators can do this
// router.put("/updateStory/:id", isUserAuthenticated, updateStory);
//delete a story - only creator can do this
router.delete("/deleteStory/:id", isUserAuthenticated, deleteStory);

module.exports = router;