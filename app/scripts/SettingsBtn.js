var SettingsBtn = React.createClass({
	toggleSettings: function() {
		this.props.toggleSettings();
		this.props.alert();
	},
	render: function() {
		return (
			<div className="settingsBtn" onClick={this.toggleSettings}>
				<i className="material-icons">{this.props.settingsPage ? "place" : "perm_data_setting"}</i>
				<div>{this.props.settingsPage ? "Map view" : "Ground station settings"}</div>
			</div>
		);
	}

});