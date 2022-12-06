const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('./:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res
        .status(200)
        .json({ message: `You have updated ${req.params.id}` })
        .end();
    } else {
      res.status(400).json({ message: `No post with that ID` }).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res
        .status(200)
        .json({ message: `You have deleted ${req.params.id}` })
        .end();
    } else {
      res.status(400).json({ message: `No post with that ID` }).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
