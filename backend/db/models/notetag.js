'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTag = sequelize.define('NoteTag', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      noteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Notes"},

      },
      tagId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Tags"},

      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {});
  NoteTag.associate = function(models) {
    NoteTag.belongsTo(models.Note, { foreignKey: "noteId", onDelete: "CASCADE",});
    NoteTag.belongsTo(models.Tag, { foreignKey: "tagId", onDelete: "CASCADE",});
  };
  return NoteTag;
};
