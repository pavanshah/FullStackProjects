var app = angular.module('Airbnb');


function BecomeAHostControllerFn($state,$http,$uibModal,$window) {	
	var vm = this;
	//vm.value = 1;
	
	vm.entireplacefunc = function(value){
		console.log("entire place clicked");
		console.log("location",vm.travelLocation);
		vm.value = value;
		console.log("value is " +vm.value);
		if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
			return;
		} else {
			var lat = vm.travelLocation.geometry.location.lat();
			var long = vm.travelLocation.geometry.location.lng();
			$state.go("viewListings",{'filters':{'latitude':lgetHostat,'longitude':long}});
		}
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

			  
	 	
	}
	
	function openHostHomePage() {
		
		var modalInstance = $uibModal.open({
	 			 
			     templateUrl: 'public/views/hostHomePage.html',
		      	 controller:'hostHomePageController',
		      	controllerAs:"vm"
		      	 
		    });

			  
	 	
	}
	
	vm.Starthost = function(){
		console.log("host button clicked");
		$http.post("/starthosting").
		then(function(response) {
			console.log("here----");
			console.log(response);
			if(response.data.response==400){
				openLoginModal();
			} else {
				window.location.assign("#/hostHomePage");
			}
		})
		
	}
		
}

app.controller('BecomeAHostController',BecomeAHostControllerFn);
