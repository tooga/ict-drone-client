(function() {
	// simple express server
	var server;
	var express = require('express');
	var path = require("path");
	var drone = require("ar-drone").createClient();

	// Set express server
	var app = express();
	app.set('port', process.env.PORT || 5000);
	app.use(express.static(path.join(__dirname,'public')));
	server = require("http").Server(app);
	var io = require('socket.io')(server);
	server.listen(app.get("port"));

	var redis = require('redis').createClient(process.env.REDIS);

	redis.on('message', function(channel, message){
		io.emit('log', message);
	});

	redis.subscribe('logs.create');

	var imageFrame = null;

	io.on("connection", function(socket) {

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

	});

    app.get('/image/:id', function (req, res) {
        res.writeHead(200, { "Content-Type": "image/png" });
        return res.end(imageFrame, "binary");
    });

}).call(this);