// const { Client } = require('pg');
const { PrismaClient } = require('@prisma/client');

// const client = new Client('postgres://localhost:5432/prisma_juicebox');
const prisma = new PrismaClient();

//test connecting to DB (inside client.js) (DELETE WHEN DONE TESTING)
// client.connect();
// console.log('CONNECTED TO DATABASE');

//CREATE
// Prisma function to POST /auth/register - create a new User with the provided credentials and return a token
const registerUser = async (username, password) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    })
    return newUser;
  } catch (err) {
    console.log('Error occurred', err);
  }
};

// READ
// Prisma function to GET /api/posts - get all posts (anyone can access)
const getAllPosts = async () => {
  try {
    const rows = await prisma.post.findMany();
    return rows; // returns [ { id: 1, title: 'Alice in Wonderland', content: 'hi', userId: 1 } ]
  } catch (err) {
    throw err;
  }
};

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


module.exports = {
  registerUser,
  getAllPosts,
  getPostById
}