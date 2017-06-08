var app = angular.module('CommunityServer');

function moderatorControllerFn($state,$http,loginService,$uibModal) {
	
	var vm = this;
	vm.userData = loginService.getUserData();
	vm.messages = {};
 	vm.messages.serviceAlerts = [
	    
	];
	vm.messages.userAlerts = [
	    
	];

	vm.closeServiceAlert = function(index) {
	    vm.messages.serviceAlerts.splice(index, 1);
	};

	vm.closeUserAlert = function(index) {
	    vm.messages.userAlerts.splice(index, 1);
	};

	vm.addUserAlert = function(data) {
	    vm.messages.userAlerts.push(data);
	 };

	 vm.addServiceAlert = function(data) {
	    vm.messages.serviceAlerts.push(data);
	 };
	var fetchUsersToBeApproved = function() {
		var reqJSON = {
			data:{
				cluster:vm.userData.cluster
			}
		}
		$http.post("/fetchUsersToBeApproved",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.userRequests = res.data.data;
				console.log(res);	
			}
			
		});
	}

	var fetchServicesToBeApproved = function() {
		var reqJSON = {
			data:{
				service_id:vm.userData.cluster
			}
		}
		$http.post("/fetchPendingRequests",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.serviceRequests = res.data.data;
				console.log(res);	
			}
			
		});
	}
	fetchServicesToBeApproved();
	vm.approveUser = function(user) {
		var reqJSON = {
			data:{
				email:user.email
			}
		}

		$http.post("/approveUser",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.addUserAlert({msg:"User approved!",type:"success"})
				fetchUsersToBeApproved();
			}
			
		});
	}

	vm.approveServiceRequest = function(service) {
		var reqJSON = {
			data:{
				email:service.user_email,
				_id:service.service_cart._id

			}
		}

		$http.post("/approveServiceRequest",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.addServiceAlert({msg:"Service approved!",type:"success"})
				fetchServicesToBeApproved();
			}
			
		});
	}

	vm.rejectUser = function(user) {
		var reqJSON = {
			data:{
				email:user.email
			}
		}
		
		$http.post("/rejectUser",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.addUserAlert({msg:"User request rejected!",type:"danger"})
				fetchUsersToBeApproved();
			}
			
		});
	}
	vm.rejectServiceRequest = function(service) {
		var reqJSON = {
			data:{
				email:service.user_email,
				_id:service.service_cart._id
			}
		}

		$http.post("/rejectServiceRequest",reqJSON).
		then(function(res) {
			if(res.status==200){
				vm.addServiceAlert({msg:"Service request rejected!",type:"danger"})
				fetchServicesToBeApproved();
			}
			
		});
	}
	fetchUsersToBeApproved();

	
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
		  
		});
		  
 	}

 	var getRequestedServices = function () {
 		$http.post("/getRequestedServices").
		then(function(res) {
			if(res.status==200){
				vm.services = res.data.result;
				console.log(res);	
			}
			
		});
 	}

 	vm.logout = function() {
 		loginService.logout().
	 	then(function(res) {
	 		
	 	})
 	} 
 	
}

app.controller('ModeratorController',moderatorControllerFn);