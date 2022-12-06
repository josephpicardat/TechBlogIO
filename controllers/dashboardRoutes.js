const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
  try {
    // finds all user posts
    const postData = await Post.findAll({
      where: {
        userID: req.session.userId,
      },
    });

    // Maps over postData to read it
    const posts = postData.map(post => post.get({ plain: true }));

    // Renders data in allPosts
    res.render('allPostsUser', { layout: 'dashboard', posts });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});

router.get('./edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
