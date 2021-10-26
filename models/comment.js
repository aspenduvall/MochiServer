const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  username: {
    type: DataTypes.STRING(100),
  },
  comment: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

module.exports = Comment;
