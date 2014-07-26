var express = require('express'); // Web framework
var app = express();
var http = require('http').Server(app);
var cookieParser = require('cookie-parser'); // Better cookies
var io = require('socket.io')(http); // Real-time web sockets
var stylus = require('stylus'); // Better CSS
var nib = require('nib'); // Adds vendor-prefix support to stylus
var jade = require('jade'); // Smart HTML templating
var morgan = require('morgan'); // Connection logging
var mongo = require('mongodb'); // NoSQL database
var monk = require('monk'); // Better Mongo interactions

var db = monk('localhost:27017/boilerplate'); // Listens on database server

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        // .set('compress', true) // Comment for readable CSS
        .use(nib());
}

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
    {src: __dirname + '/stylesheets',
     dest: __dirname + '/public',
     compile: compile
     }
))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());
app.use(morgan('common'));

// Routing
app.get('/', function(req, res){
  res.render('index')
});

// Sockets
// io.sockets.on('connection', function(socket){
//   console.log('A user has connected!');
//   socket.on('disconnect', function(){
//     console.log('A user has disconnected!');
//   });
// });

// Server
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
