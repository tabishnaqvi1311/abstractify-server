const express = require("express");
const router = express.Router();

//get all stories - with pagination - anyone can do this
router.get();
//get one storie - anyone can do this
router.get()
//create a story
router.post();
//update a story - only creator and collaborators can do this
router.put();
//delete a story - only creator can do this
router.delete();

module.exports = router;