var app = angular.module('JobBoard');
function UpdateCompanyControllerFn($state,$http,$uibModal) {
	
	var vm = this;
	vm.user = {};
	vm.update = {};
	vm.home = {};
	vm.home.message = '';

	vm.fetchCompanyDetails = function(){
		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/getCompanyDetails", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.update = res.data.Response;
 				console.log(vm.update);

 			}
 		}).catch(function(res) {
 			vm.home.message = 'Something went wrong. Please try again.';
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
 				$state.go("jobSeekerLogin");
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Something went wrong. Please try again.';
		})
	}


	vm.updateCompany = function() {

 		var reqJSON = {
			"data": {
				"email": vm.update.email,
				"name": vm.update.name,
				"website": vm.update.website,
				"imageURL": vm.update.imageURL,
				"address": vm.update.address,
				"description": vm.update.description,
				"password": vm.update.password
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateCompanyDetails",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.update = {};
 				vm.home.message = 'Company details updated successfully.';
 				vm.fetchCompanyDetails();
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Please enter proper details.';
		})
 	} 

 	vm.cancelCompany = function() {
 		$state.go("companyHome");
 	} 

 	vm.fetchCompanyDetails();

}

app.controller('UpdateCompanyController',UpdateCompanyControllerFn);