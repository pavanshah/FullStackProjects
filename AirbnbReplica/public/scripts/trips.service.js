var app = angular.module("Airbnb");


function tripsServiceFn($http) {

	var trips = [];	

	function getTrips() {

		console.log("inside trip service");
		return $http.get('getTrips').
		then(function(response) {
				if(response.status == 200)
				{
					console.log("ressss"+response);
					trips = response.data;
					console.log("tripssss"+trips[0]);
				}
				return trips;
			});
		}

	return {
		getTrips : getTrips
	}
}


app.service("tripsService",tripsServiceFn);