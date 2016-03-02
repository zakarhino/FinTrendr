var express = require('express')
var app = express ();
var routes = require('./server/routes');

routes(app);

var port = process.env.PORT || 3000

app.listen(port,function(){
  console.log('Server Established. Running on port '+port);
})