const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { registerUser } = require('../db/client.js')

// signToken function (what does this do?)
const signToken = (id, username) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

// create a user with a hashed password
router.post("/register", async (req, res) => {
  console.log('/register endpoint');
  //they give me a username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  console.log('USERNAME', username)

  //I need to hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  try {
    //Create the user with the username and hashed password
    const user = registerUser(username, hashedPassword);
    
    console.log('HASHED PASSWORD', hashedPassword);

    //Sign a token with user info
    const token = signToken(user.username, user.id);

    //Send back the token
    res.send({ message: "Successful Registration", token });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});


// router.post("/logic", async (req, res) => {};

module.exports = router;