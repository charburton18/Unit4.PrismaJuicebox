const requireUser = (req, res, next) => {
  if(req.user){
    next();
  }
  else{
    res.sendStatus(401);
  }
}

// API route at POST /auth/register 
// router.get('/register', async (req, res) => {
//   try {
//     const allPosts = await getAllPosts();
//     res.send(allPosts);
//   }
//   catch (err) {
//     console.log(err);
//   }
// });

// Prisma function to POST /auth/login - log in with the provided credentials and return a token
// const getPostById = async (id) => {
//   try {
//     const selectedPost = await prisma.post.findUnique({
//       where: {
//         id,
//       },
//     });
//     return selectedPost; // getPostById(1) returns { id: 1, title: 'Alice in Wonderland', content: 'hi', userId: 1 }
//   } catch (err) {
//     throw err;
//   }
// };

// API route at POST /auth/login
// router.get('/:id', async (req, res) => {
//   try {
//     const specifiedPost = await getPostById(parseInt(req.params.id));
//     res.send(specifiedPost);
//   } catch (err) {
//     console.log(err);
//   }
// });


module.exports = {
  requireUser
};