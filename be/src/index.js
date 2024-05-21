const express = require('express');
const http = require('http');
const morgan = require('morgan');
const db = require('../config/mongoDB');
const app = express();
const port = 5000;
const cors = require('cors')
const server = http.createServer(app);
const route = require('./routes');


db.connect();

app.use(morgan('combined'))




route(app); // Pass the express app instance to the route function

server.listen(port, () => { 
    console.log(`Example app listening on port ${port}`);
});
