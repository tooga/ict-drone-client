var AlertBox = React.createClass({
	getInitialState: function() {
		return {
			count: 60
		}
	},
	componentDidMount: function() {
		this.setTimer();
	},
	setTimer: function() {
		var timer = setInterval(function() {
			var count = this.state.count-1;
			if(this.isMounted()) {
				this.setState({
					count: count
				}, function() {
					if (this.state.count == 0) {
						clearInterval(timer);
						this.landDrone(false);
					}
				})
			} else {
				clearInterval(timer);
			}
		}.bind(this), 1000)
	},
	takeControl: function() {
		this.props.takeControl();
	},
	landDrone: function(user_control) {
		this.props.landDrone(user_control);
	},
	render: function() {
		return (
			<div id="alertBox" className="z-depth-2">
				<h5 className="center log-gray">DRONE[{this.props.alertedLog.drone_id}] DETECTED IN AREA {this.props.alertedLog.ground_station_area_id}</h5>
				<div className="action">
					<h5 className="center white-text">CHOOSE ACTION</h5>
					<h5 className="center white-text">0:{this.state.count}</h5>
				</div>
				<div className="row">
					<div className="col s6"><a className="waves-effect waves-light btn btn-green btn-large right" onClick={this.takeControl}>CONTROL</a></div>
					<div className="col s6"><a className="waves-effect waves-light btn btn-gray btn-large left" onClick={this.landDrone.bind(this, true)}>LAND</a></div>
				</div>
			</div>
		);
	}

});