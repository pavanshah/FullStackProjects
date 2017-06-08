var app = angular.module("CommunityServer");

function RequestServiceModalControllerFn($uibModalInstance,$http,service,loginService) {
	var vm = this;
	vm.userData = loginService.getUserData();
	vm.view = "submitMessage";
	vm.service = service;
	console.log(vm.service)

  
	vm.ok = function () {
    $uibModalInstance.dismiss();
  };
  

  	vm.requestService = function() {
  		var requestJSON = {
  			"data":{
  				service_id:service.service_id,
  				service_name:service.servicename,
  				user_description:vm.userMessage
  			}
  		}

  		$http.post("/requestNewService",requestJSON).
  		then(function(res) {
  			if(res.status==200){
  				vm.view = "successMessage";
  			}
  		})

  	}


  	vm.apply = function() {
  		$uibModalInstance.close();
  	}

  	
}

app.controller('RequestServiceModalController',RequestServiceModalControllerFn)