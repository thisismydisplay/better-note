'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(100),
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, {foreignKey: "userId"});
    Notebook.hasMany(models.Note, { foreignKey: "notebookId"});
  };
  return Notebook;
};
