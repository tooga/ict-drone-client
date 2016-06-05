var map;

var Map = React.createClass({

	componentDidMount: function() {
    	/*var mapDiv = document.getElementById('map-container');
    	map = new google.maps.Map(mapDiv, {
    		center: {lat: 45.630055, lng: 8.725499},
      		zoom: 13,
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
    	});*/
	},
	componentDidUpdate: function() {
		/*google.maps.event.trigger(map, "resize");
		map.setCenter({lat: 45.630055, lng: 8.725499});
		if (this.props.halfSize) {
			map.setZoom(12);
		} else {
			map.setZoom(13);
		}*/
	},
	render: function() {
		return (
			<div id="map" className="left">
				<div id="map-container">
					<img className="responsive-img" src={this.props.halfSize ? "images/map_half.png" : "images/map_full.png"}/>
				</div>
			</div>
		);
	}

});