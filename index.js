
const path = require('path');
var app = require('./app');
var express = require('express');
const appSet = express();
const bodyParser = require('body-parser');
// Serve static files from the React app

appSet.use(bodyParser.json());
appSet.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.set('port', port);

//var server = http.createServer(app);
app.listen(port);
//port.on('error', onError);
//port.on('listening', onListening);
