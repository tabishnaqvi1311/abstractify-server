const Chapter = require("../models/Chapter");
const Story = require("../models/Story");

const getChapters = async (req, res) => {
    const { id } = req.params;

    const allChapters = await Story.findById(id);
    if (!allChapters) return res.status(404).json("No story with that ID found");

    return res.status(200).json(allChapters.chapters)

}

const getChapter = async(req, res) => {
    const {id} = req.params;

    const chapter = await Chapter.findById(id);
    if(!chapter) return res.status(404).json("chapter not found");

    const story = await Story.findById(chapter.story);
    if(!story) return res.status(404).json("associated story may have been deleted");

    return res.status(200).json(chapter);
}

const createChapter = async(req, res) => {
    const {id, title, content} = req.body;

    if(!id || !title || !content) return res.status(400).json({error: "Fill in the fields"});

    const story = await Story.findById(id);
    if(!story) return res.status(404).json("associated story may have been deleted");

    const chapter = new Chapter({
        title: title,
        content: content,
        story: story._id,
        author: story.author
    })

    story.chapters.push(chapter);

    await chapter.save();
    await story.save();

    return res.status(201).json({chapter});
}

const updateChapter = async(req, res) => {
    //what the crux of this entire app is based on. other users being able to edit chapters
    //will probably use a patch request for this
}
const deleteChapter = async(req, res) => {
    //delete a chapter, ig only the author should be able to do this
    const id = req.params.id;



    const chapter = await Chapter.findById(id);
    if(!chapter) return res.status(404).json("chapter has either been deleted or does not exist");

    if (req.user !== chapter.author.toString()) return res.status(403).json("Only the author can delete the chapter!");

    const story = await Story.findById(chapter.story);
    if(!story) return res.status(400).json("associated story not found");

    const indexOfChapterToDelete = story.chapters.indexOf(id);
    if(indexOfChapterToDelete !== -1) story.chapters.splice(indexOfChapterToDelete, 1);

    await story.save();

    await Chapter.deleteOne({_id: id});


    return res.status(200).json(chapter);

}

module.exports = { getChapters, getChapter, createChapter, updateChapter, deleteChapter };