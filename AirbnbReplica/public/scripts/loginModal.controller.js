var app = angular.module("Airbnb");

function loginModalControllerFn($uibModalInstance,loginService) {
	var vm = this;
	vm.userData = {};
	vm.required = false;
	vm.ok = function () {
		vm.required = true;
		
		if(vm.userData.email == null || vm.userData.password == null)
			{
				//Either of the inputs is not provided
			}
		else
			{
				 loginService.login(vm.userData).
			     then(function(response) {
			     	if(response==true){
			     		loginService.getUserProfile().
			     		then(function(user) {
			     			vm.serverError="";
			     			$uibModalInstance.close(user);
			     		})
			     	}
			     	if(response.status==400){
			     		vm.serverError = response.data.message;
			     	}
			     },function(err) {
			     	vm.serverError = er;
			     })
				
			}
  	};


  	vm.signUp = function(){
  		$uibModalInstance.dismiss("signup");
  	}

}

app.controller('LoginModalController',loginModalControllerFn)