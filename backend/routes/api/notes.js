const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");

// const noteValidations = require("../../validations/notes");

const router = express.Router();

router.get(
    "/:id",
    asyncHandler(async function (req, res) {
        const {userId} = req.body;
        const notes = await Note.findAll({where: {userId: req.params.id}});
        console.log("insideFetch");
        console.log("notes: ", notes);
        return res.json(notes);
    })
);
router.get(
    "/:id/current",
    asyncHandler(async function (req, res) {
        // const {id} = req.body;
        const note = await Note.findOne({where: {id: req.params.id}});

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
        if (!note.title) note.title = 'untitled';
        await note.save();
        return res.json({ message: 'Successfully edited note.', note})
        // const { title, content, userId, notebookId } = req.body;
        // const note = {content, userId}
        // if (!title) note.title = 'untitled';
        // await Note.update(await Note.findByPk(req.params.id))
        // const note = await Note.updateItem(req.body);
        // return res.json(note);
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
