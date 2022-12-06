const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/commentRoutes', commentRoutes);
router.use('/postRoutes', postRoutes);

module.exports = router;
