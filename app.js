require('events').EventEmitter.prototype._maxListeners = 0;
var express = require('express'), 
//routes = require('./routes'),
//api = require('./routes/api'),
firebase = require('firebase'),
http = require('http'),
formidable = require('formidable'),
util = require('util'),
fs   = require('fs-extra'),
//routes = require('./routes'),
//api = require('./routes/api'),
path = require('path'),
//socket = require('socket.io'),
//sock = require('./components/stats/socket.js'),
mysql = require('mysql'),
ent = require('ent'),
url_view = "http://51.254.119.71/rniavet/generateur/app/components/",
application_root = __dirname,
vhost = require( 'vhost' ),
multipart = require('connect-multiparty'),
multipartyMiddleware = multipart(),
html = require('html'),
path = require ('path'),
nano = require('nano')('http://51.254.119.71:5984'),
db_application = nano.db.use('application'),
flash = require('connect-flash'),
passport = require('passport'),
nodemailer = require('nodemailer'),
smtpTransport = require('nodemailer-smtp-transport'),
LocalStrategy = require('passport-local').Strategy,
morgan = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser   = require('body-parser'),
session      = require('express-session');

console.log("application_root:"+application_root);

var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/'));
app.set('port', process.env.PORT || 2302); 
app.set('views', __dirname + '/app/components');

app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(flash());
app.use(app.router);

app.use(multipart({
    uploadDir: 'app/assets/img'
}));

/*************début code upload image/pdf****************/
app.post('/uploads', multipartyMiddleware, function (req, res) 
{
	console.log("multipartyMiddleware:");
	console.log(multipartyMiddleware);
	console.log("req:");
    console.log(req);
    
	var file = req.files.file;
	var face = req.body.face;
    console.log("req.body:");
    console.log(req.body);
    console.log("file.type:");
    console.log(file.type);
	console.log("file.path:");
    console.log(file.path);
	console.log("file.name:");
    console.log(file.name);
	fs.readFile(file.path, function (err, data) {
	  console.log("on est passé");
	  var newPath = __dirname + "/www/img/personnel/"+face;
	  console.log('newPath:');
	  console.log(newPath);
	  console.log('data:');
	  console.log(data);
	  fs.writeFile(newPath, data, function (err) {
	  	 if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                    console.log("file.name:"+face);
                    // Delete the "temp" file
                    fs.unlink(file.path, function(err) {
                    if (err) {
                            console.error(err);
                            console.log("TROUBLE deletion temp !");
                            } else {
                            console.log("success deletion temp !");
                            }
                    });      
                }    
	  });
	});
	
});
/**************fin code upload image/pdf*****************/

// Socket.io Communication

io.sockets.on('connection', function (socket) {
	console.log('socket:');
	console.log(socket);
	//socket.emit('test', 'Vous êtes bien connecté !');
	//socket.broadcast.emit('test', 'Un autre client vient de se connecter !');

	socket.on('face', function (f) {
		//socket.emit('test2', compteur);
		console.log('Seb, le retour est : ');
		console.log(f);
		console.log("file.name:");
    console.log(f.file);
		console.log("file.type:");
    console.log(f.type);
	console.log("file.path:");
    console.log(f.path);
	});
	socket.on('ok', function (f) {
		//socket.emit('test2', compteur);
		console.log('Bastien, le retour est : ');
		console.log(f);
		console.log("file.name:");
    console.log(f.name);
    console.log("file.type:");
    console.log(f.type);
	console.log("file.path:");
    console.log(f.path);
	});
	socket.on('test2', function (compteur) {
		//socket.emit('test2', compteur);
		console.log('Seb, le retour est : ');
		console.log(compteur);
		socket.broadcast.emit('test2', compteur); 
	});
	socket.on('test', function (message) {
		console.log('Seb, le retour est : ');
		console.log(message);
		//socket.emit('test', message);
		socket.broadcast.emit('test', message);
	});
	socket.on('json', function (message) {
		console.log('Seb, le retour est : ');
		fs.writeFile(__dirname + "/testSeb1.json", message, function (err) {
	  	 if (err) {
                    console.error(err);
                } else {
                    console.log("success, c ok SEB!");      
                }    
	  });
		socket.broadcast.emit('json', message);
	});
	
}); 
//http.listen(2303, "51.254.119.71");
//server.listen(2302);
 
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode',app.get('port'),app.settings.env);
});
/******************************************/
