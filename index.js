
var SERVER_PORT = 4567,
	SERVER_HOST = 'localhost';

var Hapi = require('hapi'),
	ArticleController = require('./ArticleController');

//Create server object
var server = new Hapi.Server();

// Create a connection, server can have more than one connection, but for the sake of this demo,
// it will have only one connection, at port 4567
server.connection({
	port : SERVER_PORT,
	host : SERVER_HOST
});

//Set up the templating engine
server.register(require('vision'), function(err) {
		server.views({
		engines : {
			html : require('handlebars')
		},
		relativeTo : __dirname,
		path : 'templates'
	});
});


//Handle routes here
Object.keys(ArticleController).forEach(function(routeHandler){
	server.route(ArticleController[routeHandler]);
});

//Start the server
server.start(function() {
	console.log('The server has started at port ' + SERVER_PORT);
});