const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  comment: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(500),
  }
});

module.exports = Comment;