var app = angular.module("Airbnb");

var orderSuccessControllerFn = function($state,$stateParams) {
	

	var vm = this;
	vm.trip = $stateParams.trip;
	console.log(vm.trip);
	vm.userBill = function(){
		console.log("inside order click");
		$state.go("userBill",{"trip":vm.trip});
	}
}

app.controller("orderSuccessController", orderSuccessControllerFn);