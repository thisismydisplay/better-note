"use strict";
const randomDate = require("../../utils/date");
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert(
            "Notebooks",
            [
                {
                    userId: 1,
                    title: "First Notebook",
                    createdAt: randomDate(
                        new Date(2018, 0, 1),
                        new Date(2020, 2, 30)
                    ),
                    updatedAt: randomDate(new Date(2022, 3, 1), new Date()),
                },
                {
                    userId: 1,
                    title: "This is my second notebook",
                    createdAt: randomDate(
                        new Date(2021, 0, 1),
                        new Date(2022, 2, 30)
                    ),
                    updatedAt: randomDate(new Date(2022, 3, 1), new Date()),
                },
                {
                    userId: 2,
                    title: "First Notebook",
                    createdAt: randomDate(
                        new Date(2021, 0, 1),
                        new Date(2022, 2, 30)
                    ),
                    updatedAt: randomDate(new Date(2022, 3, 1), new Date()),
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
   return queryInterface.bulkDelete('Notebooks', null, {});
    },
};
