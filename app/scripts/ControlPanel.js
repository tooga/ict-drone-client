
var ControlPanel = React.createClass({
	componentDidMount: function() {
		this.initKeyCommands();
	},
	initKeyCommands: function() {
		var speed = 0;
		$(document).keydown(function(event) {
			var eventData;
			if (keymap[event.keyCode] == null) {
		  		return;
			}
			event.preventDefault();
			speed = speed >= 1 ? 1 : speed + 0.2 / (1 - (speed/2));
			eventData = keymap[event.keyCode];
			return socket.emit("/drone/" + eventData.event, {
			  action: eventData.action,
			  speed: speed
			});
		});
		$(document).keyup(function(event) {
			speed = 0;
			return socket.emit("/drone/drone", {
			  action: 'stop'
			});
		});
	},
	recoverFromEmergency: function() {
		console.log("recover");
		socket.emit("/drone/drone", {
			action: 'disableEmergency'
		});
		return;
	},
	landDrone: function() {
		console.log("release");
		this.props.landDrone(true);
		return;
	},
	render: function() {
		var imgData = this.props.imgData;
		var navData = this.props.navData;
		var hasNavData = (Object.keys(navData).length > 0);
		var flyStatus;
		if (navData.flying == 0) {
			flyStatus = "LANDED";
		} else if (navData.flying == 1){
			flyStatus = "FLYING";
		} else {
			flyStatus = "UNKNOWN";
		}
		return (
			<div id="controlPanel">
				<div className="row header">
					<div className="col s12 bg-green center white-text">CONTROLLING DRONE[{this.props.alertedLog.drone_id}] IN AREA {this.props.alertedLog.ground_station_area_id}</div>
				</div>
				<div className="row panel">
					<div className="col s3 commands-container padding-10">
						<h5>MOVING COMMANDS</h5>
						<div className="row controllers">
							<div className="col s6">
								<div className="keyboard">
									<img className="responsive-img" src="images/keyboard_1.png"/>
									<div>FRONT / BACK</div>
									<div>LEFT / RIGHT</div>
								</div>
							</div>
							<div className="col s6">
								<div className="keyboard">
									<img className="responsive-img" src="images/keyboard_2.png"/>
									<div>UP / DOWN</div>
									<div>ROTATE L / R</div>
								</div>
							</div>
						</div>
						<div className="row controllers">	
							<div className="col s4">
								<div className="key">
										<img className="responsive-img" src="images/esc.png"/>
									<div>LAND</div>
								</div>
							</div>
							<div className="col s8">
								<div className="key">
										<img className="responsive-img" src="images/space.png"/>
									<div>TAKEOFF</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col s6 imgstream-container padding-10 valign-wrapper center">
						{imgData != null ? 
							<img className="responsive-img" src={imgData}/>
							: 
							<div>No video stream detected</div>
						}
					</div>
					<div className="col s3 control-container">
						<div>
							<div className="row buttons">
								<div className="col s12"><a className="waves-effect waves-light btn btn-yellow black-text" onClick={this.landDrone}>LAND & RELEASE DRONE</a></div>
								<div className="col s12"><a className="waves-effect waves-light btn btn-red black-text" onClick={this.recoverFromEmergency}>RECOVER FROM EMERGENCY</a></div>
							</div>
							<div className="row status center">
								<div className="col s12 white-text">
									<div className="log-orange">DRONE STATUS: <span className="log-red">{flyStatus}</span></div>
									<div className={"navdata-info " + (hasNavData ? "" : "hide")}>
										<div>Battery: {navData.batteryPercentage}</div>
										<div>Altitude: {navData.altitudeMeters}</div>
										<div>Velocity (X/Y/Z): {navData.xVelocity} / {navData.yVelocity} / {navData.zVelocity}</div> 
										<div>Direction: {navData.clockwiseDegrees}</div>
										<div>Front/Back: {navData.frontBackDegrees}</div>
										<div>Left/Right: {navData.leftRightDegrees}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});