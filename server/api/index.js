const express = require('express');
const router = express.Router();

// API ROUTES
router.use('/auth', require('./user.js'));
router.use('/api/posts', require('./post.js'));

module.exports = router;