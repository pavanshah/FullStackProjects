var app = angular.module("Airbnb");

var BillControllerFn = function ($http, $state, $stateParams) {
	var vm = this;
	vm.trip = $stateParams.trip;
	vm.bill={};
	vm.getBill = function() {
		console.log("khadchaadhbad"+vm.trip.trip_id);
		$http.post("/getBillByTripId",{"trip_id":vm.trip.trip_id}).
		then(function(response) {
			if(response.status == 200)
			{
				console.log("ljabdfjldbsjbajbj"+response.data.bill.trip_amount);
				vm.bill = response.data.bill;
				//vm.bill.to_date - vm.bill.from_date
				var d1 = moment(new Date(vm.bill.to_date));
				var d2 = moment(new Date(vm.bill.from_date));
				vm.days = moment.duration(d1.diff(d2)).asDays();
			}
		});
	}
	if(vm.trip != null)
	{
		vm.getBill();
	}
}

app.controller("BillController", BillControllerFn);