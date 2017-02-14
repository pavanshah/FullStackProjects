var app = angular.module('Airbnb');

function homeControllerFn($state,$http,bookingDataService) {
	
	var vm = this;

	vm.searchListings = function() {
		vm.requiredCheckinDate = false;
		vm.invalidCheckinDate = false;
		vm.requiredCheckOutDate = false;
		vm.invalidCheckOutDate = false;
		vm.requiredLocationFlag = false;

		var start_date = new Date(vm.checkInDate);//.toDateString();
		var end_date = new Date(vm.checkOutDate);//.toDateString();
		var date = new Date();
		date.setHours(0,0,0,0);


		if(vm.travelLocation == null || vm.checkInDate == null || start_date<date || vm.checkOutDate == null || end_date<start_date)
		{
			if(vm.travelLocation == null)
			{
				vm.requiredLocationFlag = true;
			}

			if(vm.checkInDate == null)
			{
				vm.requiredCheckinDate = true;
			}


			if(start_date<date)
			{
				vm.invalidCheckinDate = true;
			}

			if(vm.checkOutDate == null)
			{
				vm.requiredCheckOutDate = true;
			}

			if(end_date<start_date)
			{
				vm.invalidCheckOutDate = true;
			}
		}
		else
		{
					console.log("location",vm.travelLocation);

				if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
					return;
				}

				if (angular.isUndefined(vm.checkInDate) || angular.isUndefined(vm.checkOutDate) || vm.checkInDate==null || vm.checkOutDate==null) {
					return;
				}
				//console.log("lat location",);
				var lat = vm.travelLocation.geometry.location.lat();
				var long = vm.travelLocation.geometry.location.lng();

				bookingDataService.setBookingDates({start_date:vm.checkInDate,end_date:vm.checkOutDate});
				bookingDataService.setBookingQty(vm.qty);
				$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long,start_date:vm.checkInDate,end_date:vm.checkOutDate,qty:vm.qty}});

		}
		
	}

	//vm.checkInDate = new Date();
 	vm.checkInDatePopUp = {
    	opened: false
  	};

  	vm.checkOutDatePopUp = {
    	opened: false
  	};
  	//date formats
  	vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  	//default formate
	vm.format = vm.formats[2];
 	vm.openCheckinDate = function() {
	    vm.checkInDatePopUp.opened = true;
	};

	vm.openCheckOutDate = function() {
	    vm.checkOutDatePopUp.opened = true;
	};

	vm.qty = "1"; //default room 1
	
	vm.getAuctionableProperties = function () {
		
		$http.get("/getAuctionableProperties").
		then(function(response) {
			if(response.status==200){
				vm.auctionableProperties = response.data;
			}
		})

		
	}

	vm.getAuctionableProperties();

	vm.goToAuctionableProperty = function(property){
		$state.go("auctionablePropertyDetails",{property:property});
	}


}

app.controller('HomeController',homeControllerFn);