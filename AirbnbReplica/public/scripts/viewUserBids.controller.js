var app = angular.module("Airbnb");


var viewUserBidsControllerFn = function ($http) {

	var vm = this;
	vm.getUserBids = function () {
		
		$http.get("/getUserBids").
		then(function(data) {
			if(data.status==200){
				vm.bids = data.data;
			}
		})
	}

	vm.getUserBids();
}
	
	
app.controller("ViewUserBidsController",viewUserBidsControllerFn);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});