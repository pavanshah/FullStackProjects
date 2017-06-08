var app = angular.module('JobBoard');
function LoginControllerCompanyFn($state,$http,$uibModal) {
	
	var vm = this;
	vm.user = {};
	vm.register = {};
	vm.home = {};
	vm.home.message = '';
	vm.register.imageURL = 'http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/myImage.jpg'

	vm.registerCompany = function() {
 		
 		var reqJSON = {
			"data": {
				"email": vm.register.emailId,
				"name": vm.register.name,
				"website": vm.register.website,
				"imageURL": vm.register.imageURL,
				"address": vm.register.address,
				"description": vm.register.description,
				"password": vm.register.password
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/signUpCompany",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.register = {};
 				vm.home.message = 'Please go to verification link sent to your email.';
 				$state.go("companyRegisterLogin");
 			}
 		}).catch(function(res) {
 			if(res.status=400){
 				vm.home.message = 'User already exists.';
 			}else{
 				vm.home.message = 'Please enter proper details.';
 			}
		})
 	} 

 	vm.login = function() {
 		
 		var reqJSON = {
			"data": {
				"email": vm.user.emailId,
				"password": vm.user.password,
				"usertype": "company" 
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/login",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				$state.go("companyHome");
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Please enter proper details.';
		})
 	} 
}

app.controller('LoginControllerCompany',LoginControllerCompanyFn);