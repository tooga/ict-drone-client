(function() {
	// simple express server
	var server;
	var express = require('express');
	var path = require("path");
	var drone = require("ar-drone").createClient();
	var REDIS_VAR = require("./redis_var.js");

	// Set express server
	var app = express();
	app.set('port', process.env.PORT || 5000);
	app.use(express.static(path.join(__dirname,'.tmp')));
	app.use(express.static(path.join(__dirname,'app')));
	app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
	/* PRODUCTION */
	//app.use(express.static(path.join(__dirname,'dist')));
	server = require("http").Server(app);
	var io = require('socket.io').listen(server);
	server.listen(app.get("port"));

	// var redis = require('redis').createClient(REDIS_VAR.url);

	// redis.on('connect'     , log('connect'));
	// redis.on('ready'       , log('ready'));
	// redis.on('reconnecting', log('reconnecting'));
	// redis.on('error'       , log('error'));
	// redis.on('end'         , log('end'));

	function log(type) {
	    return function() {
	        console.log(type, arguments);
	    }
	}

	// redis.subscribe('logs.create');

	var imageFrame = null;

	io.on("connection", function(socket) {
		console.log("connection");

		socket.on("/drone/move", function(cmd) {
			io.emit("/drone/move", cmd)
		});
		socket.on("/drone/drone", function(cmd) {
			io.emit("/drone/drone", cmd)
		});

	    socket.on('navdata', function(data) {
	        io.emit('navdata', data);
	    });

	    socket.on("image", function(imageData) {
	    	imageFrame = imageData.frame;
	    	io.emit("image", imageData.src);
	    })

	 //   	redis.on('message', function(channel, message){
	 //    	console.log("log received");
	 //    	console.log(message);
		// 	io.emit('log', message);
		// });

	});

    app.get('/image/:id', function (req, res) {
        res.writeHead(200, { "Content-Type": "image/png" });
        return res.end(imageFrame, "binary"); // return ?
    });

}).call(this);