const router = require('express').Router();

// API ROUTES
router.use('/posts', require('./post.js').router);

module.exports = router;