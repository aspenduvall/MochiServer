const { Router } = require("express");
const { Post } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/new", validateSession, (req, res) => {
  const newPost = {
    title: req.body.post.title,
    content: req.body.post.content,
    image: req.body.post.image,
    tags: req.body.post.tags,
    userId: req.user.id,
  };
  Post.create(newPost)
    .then((userPost) => res.status(200).json(userPost))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  Post.findAll({include: "user"})
    .then((userPost) => res.status(200).json(userPost))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/post/:id", validateSession, (req, res) => {
  Post.findAll({
    where: { id: req.params.id, creatorID: req.user.id },
  })
    .then((userPost) => res.status(200).json(userPost))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/edit/:id", validateSession, function (req, res) {
  const editPost = {
    title: req.body.post.title,
    content: req.body.post.content,
    image: req.body.post.image,
    tags: req.body.post.tags,
  };

  const query = { where: { id: req.params.id, userId: req.user.id } };

  Post.update(editPost, query)
    .then((userPost) => res.status(200).json(userPost))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Post.destroy(query)
    .then(() => res.status(200).json({ message: "Post destroyed ):" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
