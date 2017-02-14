var app = angular.module('Airbnb');

function auctionablePropertyDetailsControllerFn($rootScope,$state,$stateParams,$http,$uibModal,loginService,bookingDataService) {
	
	var vm = this;
	vm.property = {};
	vm.bid_value = "";
	//vm.bookingDates = bookingDataService.getBooking().bookingDates;
	function getMaxBid() {
		$http.post("/getMaxBid",vm.property).
		then(function(response){
			if(response.status==200){
				console.log(response);
				if(response.data ==null){
					
				}else{
					vm.maxBid = response.data.bid_value;	
				}
				
			}
		})
	}

	function getPropertyDetails(property) {
		$http.post("/SearchPropertyById",{property_id:property.property_id}).
		then(function(response) {
			console.log(response);
			if(response.status==200){

				vm.property= response.data;
				vm.availStartDate = new Date(vm.property.property_start_date);
				vm.availEndDate = new Date(vm.property.property_end_date);
				getMaxBid();
				//vm.maxBid = _.max(, function(stooge){ return stooge.age; });
				console.log("property",vm.property);
			}
			else
			{
				console.log(response);
			}
		},function(err)
		{

					console.log(err);
					//Open the login popup
				
		});

	}

	function goToCheckoutPage() {
		$state.go("checkout",{property:vm.property});
	}

	function openLoginModal() {
	
		var modalInstance = $uibModal.open({
	 			 animation : true,
			     templateUrl: 'public/views/loginModal.html',
		      	 size: "md",
		      	 controller:'LoginModalController',
		      	 controllerAs:"vm",
		      	 backdrop : true
		    });

		     modalInstance.result.then(function (userData) {
			     vm.userData = userData;
			     $rootScope.$emit("userLoggedIn");
			     vm.placeBid();
			     /*loginService.login(userData).
			     then(function(isLoggedIn) {
			     	if(isLoggedIn){
			     		loginService.getUserProfile().
			     		then(function(user) {
			     			vm.user = user;
			     		});
			     		vm.placeBid();
			     		//bookProperty();
			     	}
			     })*/

			     console.log("userData",vm.userData);
			    }, function () {
			     // $log.info('Modal dismissed at: ' + new Date());
			});
			  
	 	
	}

	vm.placeBid = function() {
		vm.errMessage = "";
		if(vm.bid_value <= vm.property.base_price){
			vm.errMessage = "Bid Price should be greater than the base price $"+vm.property.base_price;
			return;
		}
		if(vm.bid_value <= vm.maxBid){
			vm.errMessage = "Bid Price should be greater than the Maximum bid";
			return;
		}

		$http.post("/placeBid",{property:vm.property,bid_value:vm.bid_value}).
		then(function(response) {
			if(response.status==200){
				$state.go("bidConfirmationPage");
			}
		});
	}

	vm.authenticateUser = function() {
		//calculateBill();
		$http.get("/isUserLoggedIn").
		then(function(response) {
			console.log("response",response);
			if(response.status==200){
				//vm.bookProperty();
				vm.placeBid();
				//goToCheckoutPage();
			}
			else if(response.status==401){
				
			}
		},function(err) {
			console.log("err",err);
			openLoginModal();
		})
	}
	if($stateParams.property!=null)
		getPropertyDetails($stateParams.property);
	/*else
		vm.property = bookingDataService.getBooking().property;*/
	/*console.log($stateParams);*/

	

}

app.controller('AuctionablePropertyDetailsController',auctionablePropertyDetailsControllerFn);