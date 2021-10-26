const { Router } = require("express");
const { Comment } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/new", validateSession, (req, res) => {
  const newComment = {
    postId: req.body.comment.postId,
    username: req.user.username,
    comment: req.body.comment.comment,
    userId: req.user.id,
  };
  Comment.create(newComment)
    .then((userComment) => res.status(200).json(userComment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
    Post.findAll()
    .then((userPost) => res.status(200).json(userPost))
    .catch((err) => res.status(500).json({ error: err }));
});


router.put("/edit/:id", validateSession, function (req, res) {
  const editComment = {
    comment: req.body.comment.comment,
  };

  const query = { where: { id: req.params.id, creatorID: req.user.id } };

  Comment.update(editComment, query)
    .then((userComment) => res.status(200).json(userComment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, creatorID: req.user.id } };

  Comment.destroy(query)
    .then(() => res.status(200).json({ message: "Comment destroyed ):" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;