const express = require("express");
const asyncHandler = require("express-async-handler");

const { Notebook, Note } = require("../../db/models");

const router = express.Router();

router.get(
    "/",
    asyncHandler(async function (req, res) {
        // const {userId} = req.body;
        const userId = req.query.userId;

        const notebooks = await Notebook.findAll({
            where: { userId },
            order: [["createdAt", "ASC"]],
        });
        console.log(notebooks);
        return res.json(notebooks);
    })
);

router.get(
    "/:id",
    asyncHandler(async function (req, res) {
        // const {id} = req.body;
        // const id = req.query.id;
        const notebook = await Notebook.findOne({
            where: { id: req.params.id },
        });
        // const note = await Note.findOne({where: {id}});

        return res.json(notebook);
    })
);

router.get(
    "/:id/first",
    asyncHandler(async function (req, res) {
        const { userId } = req.body;
        let firstNotebook = await Notebook.findOne({
            where: { userId: req.params.id, title: "First Notebook" },
        });
        if (!firstNotebook)
            firstNotebook = await Notebook.create({
                userId: req.params.id,
                title: "First Notebook",
            });

        return res.json(firstNotebook);
    })
);

router.post(
    "/",
    asyncHandler(async function (req, res) {
        const { title, userId } = req.body;
        const notebook = await Notebook.create({ title, userId });
        return res.json(`${notebook.title} successfully created`);
        // return res.redirect(`/api/notebooks`);
    })
);

router.put(
    "/:id",
    //   notebookValidations.validateUpdate,
    asyncHandler(async function (req, res) {
        id = req.body.id;
        const notebook = await Notebook.findByPk(id);
        const updatedNotebook = await Notebook.update(notebook);
        return res.json(notebook);
    })
);

router.delete(
    "/:id",
    asyncHandler(async function (req, res) {
        const notebook = await Notebook.findByPk(req.params.id);
        if (!notebook) throw new Error("Cannot find notebook");
        await Notebook.destroy({ where: { id: notebook.id } });
        return res.json(notebook.id);
    })
);

router.get(
    "/:id",
    asyncHandler(async function (req, res) {
        const notebook = await Notebook.findByPk(req.params.id);
        return res.json(notebook);
    })
);

router.get(
    "/:id/notes",
    asyncHandler(async function (req, res) {
        const orderBy = req.query.orderBy;

        const notes = await Note.findAll({
            where: { notebookId: req.params.id },
            order: [["updatedAt", orderBy]],
        });
        return res.json(notes);
    })
);

router.post(
    "/:id/notes",
    //   notesValidations.validateCreate,
    asyncHandler(async function (req, res) {
        const { title, content, userId } = req.body;
        if (!title) {
            title = "Untitled";
        }

        const note = await Note.create({ title, content, userId });
        return res.json(item);
    })
);

module.exports = router;
