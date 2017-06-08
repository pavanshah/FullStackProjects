var app = angular.module('JobBoard');
function ViewApplicationsControllerFn($state,$http,$uibModal,$stateParams) {
	
	var vm = this;
	var reqJSON = $stateParams.reqJSON;
	vm.jobPostObj = reqJSON.jobPostObj;

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

	vm.viewProfile = function(jobseeker){
		var reqJSON = jobseeker;
		//console.log("reqJSON in viewProfile : " , reqJSON);
		window.localStorage.setItem('jobseeker',JSON.stringify(jobseeker));
		$state.go("viewJobSeekerProfile", {reqJSON : reqJSON});
	}

	vm.fetchJobApplicants = function(){
		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobPostApplications",{"data":reqJSON},{
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.jobApplications = res.data.result;

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


 	vm.fetchJobApplicants(reqJSON);

}

app.controller('ViewApplicationsController',ViewApplicationsControllerFn);