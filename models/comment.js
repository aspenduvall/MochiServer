const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  comment: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

module.exports = Comment;