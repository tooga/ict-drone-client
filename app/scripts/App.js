var ajaxErrorCount;
var isImageLoading = false;

var App = React.createClass({ 
  // Init initial variables
  getInitialState: function() {
  	return {
  		logData: {},
      logLoaded: false,
      droneInControl: false,
      showAlert: false,
      navData: {},
      imgData: null
  	}
  },
  componentDidMount: function() {
    this.loadLog();
    socket.on('navdata', this.setNavData);
    socket.on('image', this.setImageData);
  },
  componentDidUpdate: function(prevProps, prevState) {
  },
  setNavData: function(data) {
    this.setState({
      navData: data
    })
  },
  setImageData: function(data) {
    this.setState({
      imgData: data
    })
  },
  loadLog: function() {
    var self = this;
    var logUrl = "../data/log.json";
    $.ajax({
      url: logUrl,
      success: function(data) {
        ajaxErrorCount = 0;
        self.setState({
          logData: data.log,
          logLoaded: true
        });
      },
      timeout: 10000,
      error: function(jqXHR, textStatus, errorThrown) {
        ajaxErrorCount++;
          console.log("Error: " + textStatus);
          console.log(jqXHR);
          if (ajaxErrorCount < 5) {
            self.loadEvents();
          }
      },
    })
  },
  alert: function() {
    this.setState({
      showAlert: true
    });
  },
  takeDroneInControl: function() {
    this.setState({
      droneInControl: true,
      showAlert: false
    });
  },
  landDrone: function() {
    this.setState({
      droneInControl: false,
      showAlert: false
    });
  },
  // Render function
  render: function() {
    var droneInControl = this.state.droneInControl;
    var navData = this.state.navData;
    return (
      <div className="app-container">
        <div className={"map-log-container " + (droneInControl ? "half-size" : "")}>
          <Map halfSize={droneInControl}/>
          {this.state.logLoaded ? <Log alert={this.alert} logData={this.state.logData}/> : null}
        </div>
        {droneInControl ? <ControlPanel imgData={this.state.imgData} navData={this.state.navData}/> : null}
        {this.state.showAlert ? <AlertBox takeControl={this.takeDroneInControl} land={this.landDrone} /> : null}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);