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
			if (logObj.event == "detected") {
				message = "DRONE["+logObj.droneId+"] DETECTED";
				logClass = "log-red";
			} else if (logObj.event == "taking_control"){
				message = "TAKING CONTROL OF DRONE["+logObj.droneId+"]";
				logClass = "log-white";
			} else if (logObj.event == "in_control"){
				message = "DRONE["+logObj.droneId+"] IN CONTROL"; 
				logClass = "log-light-green";
			} else if (logObj.event == "user_control"){
				message = "USER CONTROLLING DRONE["+logObj.droneId+"]";
				logClass = "log-blue";
			} else if (logObj.event == "landing"){
				message = "NO USER ACTION, LANDING DRONE["+logObj.droneId+"]";
				logClass = "log-blue";
			} else if (logObj.event == "released"){
				message = "DRONE["+logObj.droneId+"] RELEASED";
				logClass = "log-yellow";
			}
			return (
				<div key={index}>
					<span className="log-orange">[{logObj.timestamp}] </span>
					<span className="log-gray">AREA {logObj.area}: </span>
					<span className={logClass}>{message}</span>
				</div>
			)
		})
		return (
			<div id="log" onClick={this.props.alert} className="left">
				{logs}
			</div>

		);
	}

});