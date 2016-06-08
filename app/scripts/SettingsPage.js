var SettingsPage = React.createClass({
	deleteGs: function(gsId) {
      var self = this;
      $.ajax({
          url: baseUrl+"ground_stations/"+gsId,
          type: 'DELETE',
          success: function(result) {
            self.props.loadGsData();
          }
      });
    },
	openModal: function() {
      $('#gsModal').openModal();
	},
	render: function() {
		var self = this;
		var gsData = this.props.gsData;
		console.log(gsData);
		var gsRows = $.map(gsData, function(gs, index) {
			return (
				<tr key={index}>
					<td>{gs.id}</td>
					<td>Area {gs.area_id}</td>
					<td>{gs.lat}</td>
					<td>{gs.long}</td>
					<td><i onClick={self.deleteGs.bind(self, gs.id)} className="material-icons">clear</i></td>
				</tr>
			)
		})
		return (
			<div id="settingsPage" className="left">
				<div className="row">
					<div className="col s10 offset-s1 center">
						<h5>Ground station settings</h5>
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						<table className="bordered responsive-table">
					        <thead>
					          <tr>
					          	  <th>ID</th>
					              <th>Area</th>
					              <th>Latitude</th>
					              <th>Longitude</th>
					              <th></th>
					          </tr>
					        </thead>
					        <tbody>
					          {gsRows}
					        </tbody>
				     	</table>
					</div>
				</div>
				<a onClick={this.openModal} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
				<GsModal loadGsData={this.props.loadGsData}/>
			</div>
		);
	}

});