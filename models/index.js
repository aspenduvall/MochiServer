const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Post);
User.hasMany(Comment);

Post.belongsTo(User);
Post.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = {
  User,
  Post,
  Comment,
};
