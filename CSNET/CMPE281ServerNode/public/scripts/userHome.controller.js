var app = angular.module('CommunityServer');

function homeControllerFn($state,$http,loginService,$uibModal) {
	
	var vm = this;
	vm.userData = loginService.getUserData();
	vm.service = {};
	vm.service.pendingServices = _.filter(vm.userData.service_cart,function(service) {
					return service.status=="PENDING";
	});
	vm.service.completedServices = _.filter(vm.userData.service_cart,function(service) {
		return service.status=="COMPLETED" || service.status=="REJECTED";
	});
	
	
	var getAvailableServices = function() {
		$http.post("/fetchAvailableServices").
		then(function(res) {
			if(res.status==200){
				vm.services = res.data.result;
				
				console.log(res);	
			}
			
		});
	}

	if(angular.isDefined(vm.userData.email)){
		getAvailableServices();
	
	}
	
	
	vm.openRequestServiceModal = function(service) {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'requestService.html',
	      	 size: "lg",
	      	 controller:"RequestServiceModalController",
	      	 controllerAs:"vm",
	      	 backdrop : true,
	      	 resolve: {
				    service: function () {
				        return service;
				    }
	    	}
	    });

	     modalInstance.result.then(function () {
	     	getRequestedServices(); //refresh the pending services and services history
		  
		},function(argument) {
			getRequestedServices();
		});
		  
 	}

 	var getRequestedServices = function () {
 		$http.get("/getUser").
		then(function(res) {
			if(res.status==200){
				//vm.services = res.data.result;
				vm.service.pendingServices = _.filter(res.data.result.service_cart,function(service) {
					return service.status=="PENDING";
				});
				console.log(vm.service.pendingServices);
				vm.service.completedServices = _.filter(res.data.result.service_cart,function(service) {
					return service.status=="COMPLETED" || service.status=="REJECTED";
				});
				console.log(vm.service.pendingServices);
				//console.log(res);	
			}
			
		});
 	}

 	vm.logout = function() {
 		loginService.logout().
	 	then(function(res) {
	 		//$state.go("login");
	 	})
 	}
 	
}

app.controller('HomeController',homeControllerFn);