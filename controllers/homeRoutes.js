const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts
router.get('/', async (req, res) => {
  try {
    // finds all user posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Maps over postData to read it
    const posts = postData.map(post => post.get({ plain: true }));

    // Renders data in allPosts
    res.render('allPosts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    // finds post by id in params
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlePost', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// sends user to login
router.get('/login', (req, res) => {
  // checks to see if user is logged in
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// sends user to signup
router.get('/signup', (req, res) => {
  // checks to see if user is logged in
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
