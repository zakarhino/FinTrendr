var fs = require('fs');
//load babelrc for server side setup
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};
babelrcObject = JSON.parse(babelrc.toString());

console.log(babelrcObject);
console.log(JSON.parse(babelrc));
