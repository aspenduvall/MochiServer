const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Post = db.define("post", {
  title: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Post;
