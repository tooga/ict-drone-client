var Log = React.createClass({

	componentDidMount: function() {
		this.scrollToBottom();
	},
	componentDidUpdate: function(prevProps, prevState) {
	  	this.scrollToBottom();
  	},
  	scrollToBottom: function() {
	  	var element = document.getElementById("log");
    	element.scrollTop = element.scrollHeight;
  	},
	render: function() {
		var logData = this.props.logData;
		var logs = $.map(logData, function(logObj, index) {
			var message;
			var logClass;
			if (logObj.event == "new_detected") {
				message = "DRONE["+logObj.drone_id+"] DETECTED";
				logClass = "log-red";
			} else if (logObj.event == "taking_control"){
				message = "DRONE["+logObj.drone_id+"] IN CONTROL. WAITING FOR USER ACTION...";
				logClass = "log-white";
			}/* else if (logObj.event == "in_control"){
				message = "DRONE["+logObj.droneId+"] IN CONTROL"; 
				logClass = "log-light-green";
			} */else if (logObj.event == "user_control"){
				message = "USER CONTROLLING DRONE["+logObj.drone_id+"]";
				logClass = "log-blue";
			} else if (logObj.event == "land_automatic"){
				message = "NO USER ACTION, LANDING DRONE["+logObj.drone_id+"]";
				logClass = "log-blue";
			} else if (logObj.event == "land_user"){
				message = "LANDING DRONE["+logObj.drone_id+"]";
				logClass = "log-yellow";
			} else {
				message = logObj.event + " DRONE[" + logObj.drone_id+"]";
				logClass = "low-white";
			}
			return (
				<div key={index}>
					<span className="log-orange">[{logObj.created_at_time}] </span>
					<span className="log-gray">AREA {logObj.ground_station_area_id}: </span>
					<span className={logClass}>{message}</span>
				</div>
			)
		})
		return (
			<div id="log" className="left">
				{logs}
			</div>

		);
	}

});