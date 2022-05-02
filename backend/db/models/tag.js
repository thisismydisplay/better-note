'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tagName: {
        allowNull: false,
        type: DataTypes.STRING
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
  Tag.associate = function(models) {
    Tag.hasMany(models.NoteTag, { foreignKey: "tagId"});
    Tag.belongsToMany(models.Note, {
        through: "NoteTag",
        otherKey: "noteId",
        foreignKey: "tagId",
    })
  };
  return Tag;
};
