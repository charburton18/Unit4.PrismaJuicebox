const express = require ('express');
const app = express();
const client = require('./db/client');
const { getAllPosts } = require('./api/post.js');
const router = require('./api/index.js');

// connect server.js to db
client.connect();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//API ROUTES PART 1
app.use('/api', router);
// app.use('/auth', require('./auth/auth.js'));


app.listen(8080, () => console.log(`listening on port 8080`));