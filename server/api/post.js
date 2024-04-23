const { PrismaClient } = require("@prisma/client");
const router = require('express').Router();
const prisma = new PrismaClient();


// Prisma function to GET /api/posts - get all posts (anyone can access)
const getAllPosts = async () => {
  try {
    const rows = await prisma.post.findMany();
    return rows; // returns [ { id: 1, title: 'Alice in Wonderland', content: 'hi', userId: 1 } ]
  } catch (err) {
    throw err;
  }
};

// API route at /api/posts calls getAllPosts
router.get('/', async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.send(allPosts);
  }
  catch (err) {
    console.log(err);
  }
});

// Prisma function to GET /api/posts/:id - get the post specified by id (anyone can access)
const getPostById = async (id) => {
  try {
    const selectedPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return selectedPost; // getPostById(1) returns { id: 1, title: 'Alice in Wonderland', content: 'hi', userId: 1 }
  } catch (err) {
    throw err;
  }
};

// API route at /api/posts/:id calls getPostById
router.get('/:id', async (req, res) => {
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


module.exports = { 
  router,
  getAllPosts,
  getPostById
};