var AlertBox = React.createClass({

	takeControl: function() {
		this.props.takeControl();
	},
	land: function() {
		this.props.land();
	},
	render: function() {
		return (
			<div id="alertBox">
				<h4 className="center">Alert</h4>
				<div className="row">
					<div className="col s6"><a className="waves-effect waves-light btn btn-green" onClick={this.takeControl}>CONTROL</a></div>
					<div className="col s6"><a className="waves-effect waves-light btn btn-gray" onClick={this.land}>LAND</a></div>
				</div>
			</div>
		);
	}

});