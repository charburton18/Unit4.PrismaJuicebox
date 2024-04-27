const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { registerUser, getUserByUsername } = require('../db/client.js')

// signToken function
const signToken = (id, username) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "10w",
  });
  return token; //string of num/letters
};

// POST /auth/register - create a user with a hashed password
router.post("/register", async (req, res) => {
  //they give me a username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  console.log('USERNAME', username)

  //I need to hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  try {
    //Create the user with the username and hashed password
    const user = await registerUser(username, hashedPassword);
    
    console.log('HASHED PASSWORD', hashedPassword);

    //Sign a token with user info
    const token = signToken(user.id, user.username);

    //Send back the token
    res.send({ message: "Successful Registration", token });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});

// POST /auth/login - 
// user puts in username and password
// check that username exists in database (unique)
  // if not, send 401 (unauth)
// if exists, check if typed in password matches that user's password in db
  // if it does not match, send 401 (unauth)
  // if passwords match, then generate JWT
  // return JWT to user
//Log in a user
router.post("/login", async (req, res) => {
  //they give me a username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  //Does this user exist?
  try {
    const user = await getUserByUsername(username);

    //If there is no user send back a 401 Unauthorized
    if (!user) {
      res.sendStatus(401);
    } else {
      //Check the password against the hash
      const passwordIsAMatch = await bcrypt.compare(
        plainTextPassword,
        user.password
      );
      if (passwordIsAMatch) {
        //This is a valid log in

        const token = signToken(user.username, user.id);

        res.send({ message: "Succesfully Logged in", token });
      } else {
        res.sendStatus(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;