'use strict';

const express = require('express');
const path = require('path');
const app = express();
var http = require('http');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, '/')));
// Use the built-in express middleware for serving static files from './public'
app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', function(req, res) {
        res.sendfile('public/home.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});