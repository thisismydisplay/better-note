const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");

// const noteValidations = require("../../validations/notes");

const router = express.Router();

router.get(
    "/",
    asyncHandler(async function (req, res) {
        const orderBy = req.query.orderBy
        const userId = req.query.userId
        // const {userId} = req.body;
        const notes = await Note.findAll({where: {userId}, order: [["updatedAt", orderBy]]});
        return res.json(notes);
    })
);
router.get(
    "/:id",
    asyncHandler(async function (req, res) {
        // const {id} = req.body;
        // const id = req.query.id;
        const note = await Note.findOne({where: {id: req.params.id}});
        // const note = await Note.findOne({where: {id}});

        return res.json(note);
    })
);

router.post(
    "/",
    asyncHandler(async function (req, res) {
        console.log(req);
        const { title, content, userId, notebookId } = req.body;
        const note = {title, content, userId, notebookId};
        if (!title) note.title = 'untitled';
        await Note.create(note)
        return res.json(`${note.title} successfully created`);
        // return res.redirect(`/api/notebooks`);
    })
);

router.put(
    "/:id",
    //   noteValidations.validateUpdate,
    asyncHandler(async function (req, res) {
        const note = await Note.findByPk(req.params.id)
        const {title, content, notebookId} = req.body;
        console.log(req.body)
        if (!note.title) note.title = 'untitled';
        note.title = title;
        note.content = content;
        note.notebookId = notebookId;
        await note.save();
        console.log('==============')
        console.log(note)
        return res.json(note)

    })
);

router.delete(
    "/:id",
    asyncHandler(async function (req, res) {
        const note = await Note.findByPk(req.params.id);
        await note.destroy();
        return res.json({ message: "Successfully deleted note." });
    })
);

module.exports = router;
