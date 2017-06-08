var app = angular.module('JobBoard');
filepicker.setKey("Agm49GXXQQKecLwsP74odz");
function jobseekerApplicationsControllerFn($state,$http,$uibModal,$stateParams) {
	
	var vm = this;
	vm.itemsPerPage = 10;
	vm.currentPage = 1;
	vm.data={};

	vm.changeStatus = function(application, status) {
		application.status = status;
		var reqJSON = {
			"data":  application
		}

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateApplication",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				var returnApplication = res.data.Response;
 				console.log(res.data.Response);
 				//$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			console.log(res);
 			vm.data.message = 'Something went wrong please try again.';
 			
		})
	}

	vm.getApplications = function() {

		var reqJSON = {
			"data": {}
		}

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobSeekerApplications",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.jobApplications = res.data.result;
 				console.log(res.data.result);
 				//$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			console.log(res);
 			if(res.status == 404){
 				vm.data.message ="No results found.";
 			}
 			else{
 				vm.data.message = 'Something went wrong please try again.';
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
 				$state.go("jobSeekerLogin");
 			}
 		}).catch(function(res) {
 			vm.data.message = 'Something went wrong. Please try again.';
		})
	}

	vm.getApplications();

}

app.controller('jobseekerApplicationsController',jobseekerApplicationsControllerFn);