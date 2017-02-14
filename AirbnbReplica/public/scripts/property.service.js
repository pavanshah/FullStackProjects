var app = angular.module("Airbnb");


function propertyServiceFn($http) {

	function getProperties(propertyFilters) {
		
		var properties = [];

		return $http.post("/SearchPropertyByDistance",propertyFilters).
		then(function(response) {
			if(response.status==200){
				properties = response.data;
			}
			return properties;		
		})


	}


	return{
		getProperties:getProperties

	}
}


app.service("propertyService",propertyServiceFn);