var isImageLoading = false;

var App = React.createClass({ 
  // Init initial variables
  getInitialState: function() {
  	return {
  		logData: {},
      dataLoaded: false,
      gsData: {},
      navData: {},
      droneInControl: false,
      showAlert: false,
      imgData: null,
      settingsPage: false
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
        self.setState({
          logData: data.log
        }, function() {
          this.loadGroundStations();
        });
      },
      timeout: 10000,
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
          console.log(jqXHR);
      },
    })
  },
  loadGroundStations: function() {
    var self = this;
    var gsUrl = "http://theshepherd.herokuapp.com/api/ground_stations";
    $.ajax({
      url: gsUrl,
      success: function(data) {
        self.setState({
          gsData: data.ground_stations,
          dataLoaded: true
        });
      },
      timeout: 10000,
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
          console.log(jqXHR);
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
  toggleSettings: function() {
    var settingsPage = this.state.settingsPage;
    this.setState({
      settingsPage : !settingsPage
    });
  },
  // Render function
  render: function() {
    var droneInControl = this.state.droneInControl;
    var navData = this.state.navData;
    if (!this.state.dataLoaded) {return(<div></div>)}
    return (
      <div className="app-container">
        <SettingsBtn settingsPage={this.state.settingsPage} toggleSettings={this.toggleSettings}/>
        <div className={"map-log-container " + (droneInControl ? "half-size" : "")}>
          {this.state.settingsPage ? <SettingsPage loadGsData={this.loadGroundStations} gsData={this.state.gsData}/> : <Map gsData={this.state.gsData} halfSize={droneInControl}/>}
          <Log alert={this.alert} logData={this.state.logData}/>
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