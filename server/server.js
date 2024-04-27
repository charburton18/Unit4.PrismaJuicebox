const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./api/index');

// deprecated bc using prisma
// connect server.js to db
// client.connect();

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//API ROUTES PART 1
app.use('/', router);


app.listen(8080, () => console.log(`listening on port 8080`));