var isImageLoading = false;

var App = React.createClass({ 
  // Init initial variables
  getInitialState: function() {
  	return {
  		logData: [],
      allDataLoaded: false,
      gsData: {},
      navData: {},
      droneInControl: false,
      showAlert: false,
      alertedLog: {},
      imgData: null,
      settingsPage: false
  	}
  },
  componentDidMount: function() {
    this.loadLogs();
    //socket.on("drone_detected", this.droneDetected);
    socket.on("log", this.addLog);
    socket.on('navdata', this.setNavData);
    socket.on('image', this.setImageData);
  },
  componentDidUpdate: function(prevProps, prevState) {
  },
  droneDetected: function() {
    var log = '{"event":"taking_control","drone_id":1,"drone_mac_address":"2D:2D:2D:2D:2D:2D","ground_station_area_id":1,"created_at_time":"20:52"}';
    this.addLog(log);
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
  addLog: function(newLog) {
    var log = JSON.parse(newLog);
    var logData = this.state.logData;
    logData.push(log);
    if (log.event == "taking_control" && !this.state.showAlert) {
      this.setState({
        logData: logData,
        showAlert : true,
        alertedLog: log
      });
    } else if (log.event == "taking_control" && (this.state.showAlert || this.state.droneInControl)) {
      // Is this done already in server side? If one controlled, 
      // land it automatically and send just a log notification to client
      // this.landDrone("drone_in_control");
    } else {
      this.setState({
        logData: logData
      });
    }
  },
  loadLogs: function() {
    var self = this;
    var logUrl = baseUrl+"logs";
    $.ajax({
      url: logUrl,
      success: function(data) {
        data.logs.reverse();
        self.setState({
          logData: data.logs,
          noDataLoaded: false
        }, function() {
          this.loadGroundStations();
        });
      },
      timeout: 30000,
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
          console.log(jqXHR);
      },
    })
  },
  loadGroundStations: function() {
    var self = this;
    var gsUrl = baseUrl + "ground_stations";
    $.ajax({
      url: gsUrl,
      success: function(data) {
        self.setState({
          gsData: data.ground_stations,
          allDataLoaded: true
        });
      },
      timeout: 30000,
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
          console.log(jqXHR);
      },
    })
  },
  takeDroneInControl: function() {
    var log = this.state.alertedLog;
    log.event = "user_control";
    this.setState({
      droneInControl: true,
      showAlert: false
    }, function() {
      this.postLog(log);
    });
  },
  landDrone: function(user_control, logData) {
    socket.emit("/drone/drone", {
      action: 'land',
      release: true
    });
    var log = logData ? logData : this.state.alertedLog;
    if (user_control) {
      log.event = "land_user";
    } else {
      log.event = "land_automatic";
    }
    this.setState({
      droneInControl: false,
      showAlert: false,
      alertedLog: {}
    }, function() {
      this.postLog(log);
    });
  },
  toggleSettings: function() {
    var settingsPage = this.state.settingsPage;
    this.setState({
      settingsPage : !settingsPage
    });
  },
  postLog: function(log) {
    var logData = {"log": {"event": log.event, "drone_mac_address": log.drone_mac_address}};
    var self = this;
    var logUrl = baseUrl+"ground_stations/"+log.ground_station_area_id+"/logs";
    $.ajax({
      type: "POST",
      url: logUrl,
      data: logData,
      success: function(data) {
      },
      timeout: 30000,
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error: " + textStatus);
          console.log(jqXHR);
      },
    })
  },
  // Render function
  render: function() {
    var droneInControl = this.state.droneInControl;
    var navData = this.state.navData;
    if (!this.state.allDataLoaded) {return(<div></div>)}
    return (
      <div className="app-container">
        <SettingsBtn settingsPage={this.state.settingsPage} toggleSettings={this.toggleSettings}/>
        <div className={"map-log-container " + (droneInControl ? "half-size" : "")}>
          {this.state.settingsPage ? <SettingsPage loadGsData={this.loadGroundStations} gsData={this.state.gsData}/> : <Map gsData={this.state.gsData} halfSize={droneInControl}/>}
          <Log logData={this.state.logData}/>
        </div>
        {droneInControl ? <ControlPanel imgData={this.state.imgData} navData={this.state.navData} landDrone={this.landDrone} alertedLog={this.state.alertedLog}/> : null}
        {this.state.showAlert && !droneInControl ? <AlertBox takeControl={this.takeDroneInControl} landDrone={this.landDrone} alertedLog={this.state.alertedLog}/> : null}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);