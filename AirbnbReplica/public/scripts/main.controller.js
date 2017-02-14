var app = angular.module('Airbnb');


function mainControllerFn($rootScope,$uibModal,loginService,$state,$log) {
 	var vm =this;
 	vm.user = {};

 	loginService.getUserProfile().
 	then(function(userData) {
 		vm.user = userData;
 	},function(err) {
 		vm.user = {};
 	});

 	$rootScope.$on('profileUpdated', function(event, data) {
 		  loginService.getUserProfile().
		 	then(function(userData) {
		 		vm.user = userData;
		 	},function(err) {
		 		vm.user = {};
		 	});

 	});

 	$rootScope.$on('userLoggedIn', function(event, data) {
 		  loginService.getUserProfile().
		 	then(function(userData) {
		 		vm.user = userData;
		 	},function(err) {
		 		vm.user = {};
		 	});

 	});

 	 $rootScope.$on('userLoggedOut', function(event, data) {
 		  vm.user = {};

 	});

 	vm.homeNavigation = function () {
 		
 		if(vm.user.UserType=="Admin"){
 			$state.go("admin");
 		}
 		else if(vm.user.UserType=="Host"){
 			$state.go("becomehost");
 		}
 		else if(vm.user.UserType=="User"){
 			$state.go("home");
 		}
 		else
 			$state.go("home");	
 	}

 	vm.logout = function() {
 		loginService.logout().
 		then(function(response) {
 			vm.user = {};
 			$state.go("home");
 		});
 	}

 	vm.trips = function() {
 		$state.go("userHome");
 	}

 	vm.profile = function()
 	{
 		$state.go("userProfile");
 	}

 	vm.bids = function() {
 		$state.go("viewUserBids");	
 	}

 	vm.openLoginModal = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'public/views/loginModal.html',
	      	 size: "md",
	      	 controller:'LoginModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {

		     vm.user = userData;
		    

		     console.log("userData",vm.userData);
		    }, function (err) {
		      $log.info('Modal dismissed at: ' + new Date());
		      if(err && err == "signup")
		      {
		      	vm.openSignupModal();
		      }
		});
		  
 	}

 	vm.openSignupModal = function() {

 		var modalInstance = $uibModal.open({
		     templateUrl: 'public/views/signupModal.html',
	      	 size: "md",
	      	 controller:'SignupModalController',
	      	 controllerAs:"vm"
	    });

	    modalInstance.result.then(function (userData) {
		     vm.userData = userData;
			 loginService.login(userData).
			     then(function(isLoggedIn) {
			     	if(isLoggedIn){
			     		loginService.getUserProfile().
			     		then(function(user) {
			     			vm.user = user;
			     		})
			     	}
			     })
					     	

		     
		    

		     console.log("userData",vm.userData);
		    }, function (err) {
		      $log.info('Modal dismissed at: ', new Date());
		      console.log("err",err);
		      if(err && err == "login"){
		      	vm.openLoginModal();
		      }
		});
 	}
 } 


app.controller('MainController',mainControllerFn);