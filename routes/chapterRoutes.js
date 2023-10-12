const express = require("express");
const { getChapters, getChapter, createChapter, deleteChapter } = require("../controller/chapterController");
const isUserAuthenticated = require("../middleware/isUserAuthenticated");
const router = express.Router();

//get all chapters related to a story
router.get("/getChapters/:id", getChapters); //here id is id of story
//get chapter related to a story
router.get("/getChapter/:id", getChapter);
//create a new chapter - automatically do 1 of this when a story is created
router.post("/createChapter", isUserAuthenticated, createChapter);
//update a chapter related to a str
// router.put("/updateChapter/:id");
//delete a chapter related to a stry - only the author can do this
router.delete("/deleteChapter/:id",isUserAuthenticated, deleteChapter);


module.exports = router;
