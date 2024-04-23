const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/prisma_juicebox');

//test connecting to DB (inside client.js) (DELETE WHEN DONE TESTING)
// client.connect();
// console.log('CONNECTED TO DATABASE');

module.exports = client;