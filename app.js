(function() {
	// simple express server
	var server;
	var express = require('express');
	var path = require("path");

	var drone = require("ar-drone").createClient();

	// Set express server
	var app = express();
	app.set('port', process.env.PORT || 5000);
	/* DEVELOPMENT */
	app.use(express.static(path.join(__dirname,'.tmp')));
	app.use(express.static(path.join(__dirname,'app')));
	app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
	/* PRODUCTION */
	//app.use(express.static(path.join(__dirname,'dist')));
	server = require("http").Server(app);
	var io = require('socket.io')(server);
	server.listen(app.get("port"));

	io.on("connection", function(socket) {
		console.log("connection");

		socket.on("/drone/move", function(cmd) {
			drone[cmd.action](cmd.speed);
		});
		socket.on("/drone/drone", function(cmd) {
			drone[cmd.action]();
		});

	    drone.on('navdata', function(data) {
	        if(!data.demo) { return; } // ??

	        var clientData = {
	            flying: data.droneState.flying
	        };

	        var navdataClientKeys = ['controlState', 'flyState', 'batteryPercentage', 'altitudeMeters', 'clockwiseDegrees', 'frontBackDegrees', 'leftRightDegrees', 'xVelocity', 'yVelocity', 'zVelocity'];

	        for(var i=0, n=navdataClientKeys.length; i<n; i++) {
	            var k = navdataClientKeys[i];
	            clientData[k] = data.demo[k];
	        }

	        socket.emit('navdata', clientData);
	        //console.log(util.inspect(clientData, {colors:true}));
	    });

	    var currentImg = null;
		var imageSendingPaused = false;
		var index = 0;

		drone.getPngStream().on("data", function (frame) {
	        currentImg = frame;
	       	/*if (imageSendingPaused) {
		  		return;
			}*/
	        socket.emit("image", "/image/" + index++);
	        /*imageSendingPaused = true;
			return setTimeout((function() {
		  		return imageSendingPaused = false;
			}), 100);*/
		});

	    app.get('/image/:id', function (req, res) {
	        res.writeHead(200, { "Content-Type": "image/png" });
	        return res.end(currentImg, "binary"); // return ?
	    });


	});

	// FAYE
	/*socket.subscribe("/drone/move", function(cmd) {
		var _name;
		console.log("move", cmd);
		return typeof drone[_name = cmd.action] === "function" ? drone[_name](cmd.speed) : void 0;
	});
	socket.subscribe("/drone/animate", function(cmd) {
		console.log('animate', cmd);
		return drone.animate(cmd.action, cmd.duration);
	});
	socket.subscribe("/drone/drone", function(cmd) {
		var _name;
		console.log('drone command: ', cmd);
		return typeof drone[_name = cmd.action] === "function" ? drone[_name]() : void 0;
	});*/


}).call(this);