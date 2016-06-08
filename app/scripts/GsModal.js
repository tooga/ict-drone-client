var GsModal = React.createClass({
	 getInitialState: function () {  
      return {
      	area: "",
      	lat: "",
      	long: "",
        spinner: false
      }
    },
    onAreaChange: function(event) {
	this.setState({
        area: event.target.value
      });
	},
	onLatChange: function(event) {
      this.setState({
        lat: event.target.value
      });
    },
    onLongChange: function(event) {
      this.setState({
        long: event.target.value
      });
    },
    createNewGs: function() {
      var gs = {
      	"area" : this.state.area,
        "lat" : this.state.lat,
        "long" : this.state.long
      }
      return JSON.stringify(gs);
    },
    handleSubmit: function(event) {
		event.preventDefault();
		this.setState({
    		spinner:true
    	}, function() {
    		this.postGoal();
    	});
    },
    postGoal: function() {
    	var self = this;
    	var gs = this.createNewGs();
    	$.ajax({
	      url: baseUrl+"ground_stations",
	      type: "POST",
	      data: gs,
	      contentType:"application/json; charset=utf-8",
	      dataType:"json",
	      timeout: 10000,
	      success: function(data){
	      	self.setState({
	      		spinner: false
	      	}, function() {
		      	$('#gsModal').closeModal();
	        	self.props.loadGsData();
	      	})
	      },
	      fail: function() {
	      	console.log("Failed to add goal");
	      	self.setState({
	      		spinner: false
	      	}, function() {
		      	$('#gsModal').closeModal();
	      	})
	      }
	    })
    },
    closeModal: function() {
    	$('#gsModal').closeModal();
    },
	render: function () {
		return (
			<div id="gsModal" className="modal">
				<div className="modal-content">
					<a className="modal-close-btn" onClick={this.closeModal}><i className="material-icons">clear</i></a>
					<div className="col s12 center">
						<h5>Add new ground station</h5>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field col s12">
							<input id="area" type="number" className="validate" value={this.state.area} onChange={this.onAreaChange} required/>
				        	<label htmlFor="area">Area</label>
						</div>
						<div className="input-field col s12">
				          <input id="latitude" type="number" className="validate" value={this.state.lat} onChange={this.onLatChange} required/>
				          <label htmlFor="latitude">Latitude</label>
						</div>
						<div className="input-field col s12">
				          <input id="longitude" type="number" className="validate" value={this.state.long} onChange={this.onLongChange} required/>
				          <label htmlFor="longitude">Longitude</label>
						</div>
						<div className="col s12 modalBtnContainer">
							<button disabled={this.state.spinner} className="btn waves-effect waves-light" type="submit">
								OK<i className="material-icons right">send</i>
							</button>
						</div>
						{this.state.spinner ? <Spinner overlay={true}/> : null}
					</form>
				</div>
			</div>
		);
	}
});