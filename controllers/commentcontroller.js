const { Router } = require("express");
const { Comment } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/new", validateSession, (req, res) => {
  const newComment = {
    username: req.body.comment.username,
    comment: req.body.comment.comment,
    userId: req.user.id,
    postId: req.body.comment.postId,
  };
  Comment.create(newComment)
    .then((userComment) => res.status(200).json(userComment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  Comment.findAll()
    .then((userComment) => res.status(200).json(userComment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:postID", validateSession, function (req, res) {
  let postId = req.params.postID;

  Comment.findAll({
    where: { postId: postId },
  })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/edit/:id", validateSession, function (req, res) {
  const editComment = {
    comment: req.body.comment.comment,
  };

  let query;
  if (req.user.isAdmin == true) {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }

  Comment.update(editComment, query)
    .then((userComment) => res.status(200).json(userComment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.isAdmin == true) {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }

  Comment.destroy(query)
    .then(() => res.status(200).json({ message: "Comment destroyed ):" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
