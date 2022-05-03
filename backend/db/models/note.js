"use strict";
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        "Note",
        {
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
            notebookId: {
                type: DataTypes.INTEGER,
                references: { model: "Notebooks" },
            },
            title: {
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {}
    );
    Note.associate = function (models) {
        Note.hasMany(models.NoteTag, { foreignKey: "noteId" });
        Note.belongsTo(models.User, { foreignKey: "userId" });
        Note.belongsTo(models.Notebook, {
            foreignKey: "notebookId",
            onDelete: "CASCADE",
        });
        Note.belongsToMany(models.Tag, {
            through: "NoteTag",
            otherKey: "tagId",
            foreignKey: "noteId",
        });
    };
    return Note;
};
