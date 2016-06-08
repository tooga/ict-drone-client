var map;
var markers = [];

var Map = React.createClass({
	getInitialState: function() {
		return {
			
		}
	},
	componentDidMount: function() {
    	var mapDiv = document.getElementById('map-container');
    	map = new google.maps.Map(mapDiv, {
    		center: {lat: 45.630055, lng: 8.725499},
      		zoom: this.props.halfSize ? 12 : 13,
      		zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			draggable: false,
			scrollwheel: false,
			navigationControl: false,
			disableDoubleClickZoom: true
    	});
		this.setMarkers();
    	/*new google.maps.Marker({
		    position: {lat: 45.620055, lng: 8.725499},
		    map: map,
		    icon: image,
		    label: {
			    text: '2',
			    color: '#00991C',
			    fontSize: this.props.halfSize ? '14px' : '16px'
			 }
		});*/
		/*new google.maps.Marker({
		    position: {lat: 45.630055, lng: 8.725499},
		    map: map,
		    label: "1"
		});*/
	},
	setMarkers: function(image) {
		var image = {
		    url: '../images/marker.png',
		    // This marker is 20 pixels wide by 32 pixels high.
		    scaledSize: this.props.halfSize ? new google.maps.Size(65, 65) : new google.maps.Size(130, 130),
		    // The origin for this image is (0, 0).
		    origin: new google.maps.Point(0, 0),
		    // The anchor for this image is the base of the flagpole at (0, 32).
		    anchor: this.props.halfSize ? new google.maps.Point(32.5, 32.5) : new google.maps.Point(65, 65)
		};
		for (var i in this.props.gsData) {
			var gs = this.props.gsData[i];
		    var marker = new google.maps.Marker({
		      position: {lat: 45.630055, lng: 8.715499},
		      map: map,
		      icon: image,
		      /*label: {
			    text: (gs.area_id).toString(),
			    color: '#00991C',
			    fontSize: this.props.halfSize ? '14px' : '16px'
			  }*/
		    });
		    markers.push(marker);
		}
	},
	clearMarkers: function() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];
	},
	componentDidUpdate: function() {
		google.maps.event.trigger(map, "resize");
		this.clearMarkers();
		map.setCenter({lat: 45.630055, lng: 8.725499});
		if (this.props.halfSize) {
			map.setZoom(12);
		} else {
			map.setZoom(13);
		}
		this.setMarkers();
	},
	render: function() {
		return (
			<div id="map" className="left">
				<div id="map-container">
					{/*<img className="responsive-img" src={this.props.halfSize ? "images/map_half.png" : "images/map_full.png"}/>*/}
				</div>
			</div>
		);
	}

});