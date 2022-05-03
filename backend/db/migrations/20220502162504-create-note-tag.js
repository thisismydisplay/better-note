'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NoteTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Notes"},
        onDelete: 'CASCADE'


      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Tags"},
        onDelete: 'CASCADE'


      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NoteTags');
  }
};
