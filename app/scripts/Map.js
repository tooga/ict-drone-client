var map;
var markers = [];

var Map = React.createClass({
	getInitialState: function() {
		return {
			
		}
	},
	componentDidMount: function() {
    	var mapDiv = document.getElementById('map-container');
    	var styles = [
			{
			  featureType: "transit",
			  elementType: "labels",
			  stylers: [
			    { visibility: "off" }
			  ]
			},
			{
			  featureType: "poi.business",
			  elementType: "labels",
			  stylers: [
			    { visibility: "off" }
			  ]
			},
		];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
    	map = new google.maps.Map(mapDiv, {
    		center: {lat: 46.022443, lng: 11.126918},
      		zoom: this.props.halfSize ? 14 : 15,
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
    	map.mapTypes.set('map_style', styledMap);
  		map.setMapTypeId('map_style');
		this.setMarkers();
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
		      position: {lat: parseFloat(gs.lat), lng: parseFloat(gs.long)},
		      map: map,
		      icon: image,
		      label: {
			    text: (gs.area_id).toString(),
			    color: '#00991C',
			    fontSize: this.props.halfSize ? '14px' : '16px'
			  }
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
	componentDidUpdate: function(prevProps, prevState) {
		if (this.props.halfSize != prevProps.halfSize) {
			google.maps.event.trigger(map, "resize");
			this.clearMarkers();
			map.setCenter({lat: 46.022443, lng: 11.126918});
			if (this.props.halfSize) {
				map.setZoom(14);
			} else {
				map.setZoom(15);
			}
			this.setMarkers();
		}
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