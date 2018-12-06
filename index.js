
const path = require('path');
var app = require('./app');
var express = require('express');
const appSet = express();
// Serve static files from the React app
appSet.use(express.static(path.join(__dirname, 'client/build')));



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
appSet.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.set('port', port);

//var server = http.createServer(app);
app.listen(port);
//port.on('error', onError);
//port.on('listening', onListening);
