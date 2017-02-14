var app = angular.module("Airbnb");


function locationServiceFn($filter) {
	var map;
	function initMap(mapCenter){
      
        console.log("mapCenter",mapCenter);
        // Create a new map and place in the index.html page
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: mapCenter
        });
    
  }
 	// Constructor for generic location
    var Location = function(latlon, message, propertyName, propertyPrice){
        this.latlon = latlon;
        this.message = message;
        this.propertyName = propertyName;
        this.propertyPrice = propertyPrice;
    };

    function drawMarkersOnMap(locations,icon){
    	console.log("map",map);
		angular.forEach(locations,function(property) {

	    	 var marker = new google.maps.Marker({
	                   position: property.latlon,
	                   map: map,
	                   title: property.propertyTitle,
	                   icon: icon
	                   //label:"MarkerText"
	               });

		  // For each marker created, add a listener that checks for clicks
		        google.maps.event.addListener(marker, 'click', function(e){

		            // When clicked, open the selected marker's message
		            var currentSelectedMarker = property;
		            property.message.open(map, marker);
		        });
	    })

    }
	function convertToMapPoints(properties) {
	 // Clear the locations holder
        var locations = [];

        // Loop through all of the JSON entries provided in the response
        for(var i= 0; i < properties.length; i++) {
            var property = properties[i];
            if(property.propertyPictures && property.propertyPictures.length!=0)
            	var propertyImage = property.propertyPictures[0];
            else
            	var propertyImage = "public/images/room-list-images/room-1-a.png";
            // Create popup windows for each record
            var  contentString = '<p><b> ' + property.propertyTitle + '</b></p><p><img width="200" height="200" alt="property image" src="'+propertyImage+'"></p><p><b>'+ $filter('currency')(property.base_price)+'</b></p>';

            // Converts each of the JSON records into Google Maps Location format (Note Lat, Lng format).
            locations.push(new Location(
                new google.maps.LatLng(property.location[1], property.location[0]),
                new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 320
                }),
                property.propertyTitle
                
            ))
        }
        // location is now an array populated with records in Google Maps format
        return locations;
	}

	return{
		drawMarkersOnMap:drawMarkersOnMap,
		convertToMapPoints:convertToMapPoints,
		initMap:initMap

	}
}


app.service("locationService",locationServiceFn);