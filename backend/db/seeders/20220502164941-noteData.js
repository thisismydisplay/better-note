"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert(
            "Notes",
            [
                {
                    userId: 1,
                    notebookId: 1,
                    title: "This is my very first note",
                    content: "Wow what a great app. I love it.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    notebookId: 1,
                    title: "This is my second note",
                    content: "I still think this app is excellent.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,

                    title: "This is a note without a notebook",
                    content: "It should be fine without a notebook",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,

                    notebookId: 1,
                    content: "It should rename the title to untitled",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 2,

                    title: "This is a note for the second user",
                    content: "It does not have a notebookId.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    notebookId: 2,
                    title: "This is a note in the second notebook",
                    content: "Hopefully there are no errors, that would be great.",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkDelete("Notes", null, {});
    },
};
