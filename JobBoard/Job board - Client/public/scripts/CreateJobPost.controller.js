var app = angular.module('JobBoard');
function CreateJobPostControllerFn($state,$http,$uibModal) {
	
	var vm = this;
	vm.user = {};
	vm.data = {};
	vm.home = {};
	vm.home.message = '';

	

	//console.log(vm.reqJSON);
	
	vm.createJobPost = function() {
 		
 		var reqJSON = {
			"data": {
				"title": vm.data.title,
				"description": vm.data.description,
				"office_location": vm.data.office_location,
				"responsibilities": vm.data.responsibilities,
				"salary": vm.data.salary
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/addJobByCompany",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			
 			if(res.status==200){
 				$state.go("companyHome");
 			}
 		}).catch(function(res) {
 			if(res.status=400){
 				vm.home.message = 'Something went wrong. Please try again.';
 			}else{
 				vm.home.message = 'Please enter proper details.';
 			}
		})
 	} 

 	vm.logout = function() {

 		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/logout", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				$state.go("companyRegisterLogin");
 			}
 		}).catch(function(res) {
 			vm.data.message = 'Something went wrong. Please try again.';
		})
	}

	vm.cancelCreateJobPost = function() {
 		$state.go("companyHome");
 	} 
 	
}

app.controller('CreateJobPostController',CreateJobPostControllerFn);