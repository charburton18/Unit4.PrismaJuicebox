const router = require('express').Router();



// API route at /api/posts calls getAllPosts
router.get('/posts', async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.send(allPosts);
  }
  catch (err) {
    console.log(err);
  }
});

// API route at /api/posts/:id calls getPostById
router.get('/posts/:id', async (req, res) => {
  try {
    const specifiedPost = await getPostById(parseInt(req.params.id));
    res.send(specifiedPost);
  } catch (err) {
    console.log(err);
  }
});

// POST /api/posts - create a new post as the currently logged-in user
// PUT /api/posts/:id - update a post only if it was created by the currently logged-in user
// DELETE /api/posts/:id - delete a post only if it was created by the currently logged-in user


module.exports = router;