var app = angular.module("Airbnb");

function CheckoutControllerFn($state,$stateParams,$http,bookingDataService) {
	var vm = this;
	vm.property = $stateParams.property;
	vm.trip_amount=0;
	vm.booking = bookingDataService.getBooking();
	vm.bookingDates = bookingDataService.getBooking().bookingDates;

	if($stateParams.property==null){
		
		
		vm.property = vm.booking.property;

	}

	console.log("Requesting Bill");
	$http.post('/CalculateBill',vm.booking).then(function(response){

		console.log(response.data.Bill_details);

		vm.Bill_details = response.data.Bill_details;
		vm.booking.trip_amount = response.data.Bill_details.Total_Bill;
	})

	vm.bookProperty = function(){

		vm.requiredNameFlag = false;
		vm.requiredNumberFlag = false;
		vm.requiredDateFlag = false;
		vm.requiredCVVFlag = false;
		vm.invalidNameFlag = false;
		vm.invalidNumberFlag = false;
		var nameregex = /^[a-zA-Z ]*$/;
		var numberregex = /^[0-9]{16}$/;
		var cvvregex = /^[0-9]{3}$/;
		vm.invalidCVVFlag = false;

		if(vm.cardName == null || vm.cardNumber == null || vm.cvv == null || vm.expirymonth == null || vm.expiryyear == null || !nameregex.test(vm.cardName) || !numberregex.test(vm.cardNumber) || !cvvregex.test(vm.cvv))
		{	
			if(vm.cardName == null)
			{
				vm.requiredNameFlag = true;
			}

			if(vm.cardNumber == null)
			{
				vm.requiredNumberFlag = true;
			}

			if(vm.cvv == null)
			{
				vm.requiredCVVFlag = true;
			}

			if(vm.expirymonth == null || vm.expiryyear == null)
			{
				vm.requiredDateFlag = true;
			}

			if(!nameregex.test(vm.cardName))
			{
				vm.invalidNameFlag = true;
			}

			if(!numberregex.test(vm.cardNumber))
			{
				if(vm.cardNumber == null){}
				else
				vm.invalidNumberFlag = true;
			}

			if(!cvvregex.test(vm.cvv))
			{
				if(vm.cvv == null){}
				else
				vm.invalidCVVFlag = true;
			}
		}

		else
		{

			console.log("out");
			$http.post("/bookProperty",vm.booking).
			then(function(response) {
			if(response.status==200){
				bookingDataService.deleteBooking();
				console.log("bookpropertyahdbadhkbda"+response.data.trip);
				$state.go("orderSuccess",{"trip":response.data.trip});
			}
			else if(response.status==401){
				openLoginModal();
			}
			})

		}
		
	}

}

app.controller('CheckoutController',CheckoutControllerFn);