var express = require('express')
var app = express()
var path = require('path');

var port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use('/scripts', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, function () {
  console.log('App is listening on port '+ port +'!')
})