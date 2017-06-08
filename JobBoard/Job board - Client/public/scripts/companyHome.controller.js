var app = angular.module('JobBoard');
function CompanyHomeControllerFn($state,$http,$uibModal) {
	
	var vm = this;
	vm.user = {};
	vm.data = {};
	vm.home = {};
	vm.home.message = '';
	vm.data.searchList = ['OPEN', 'FILLED', 'CANCELLED'];
	vm.data.statusToShow = 'OPEN';



	vm.goToUpdateJobPost = function(jobPostObj){
		var reqJSON = {};
		reqJSON.jobPost = jobPostObj;
		window.localStorage.setItem('jobPostObj',JSON.stringify(jobPostObj));
		$state.go("updateJobPost",{reqJSON:reqJSON});
	}

	vm.goToViewApplicants = function(jobPostObj){
		var reqJSON = {};
		reqJSON.jobPostId = jobPostObj.jobPostId;
		reqJSON.jobPostObj = jobPostObj;
		//window.localStorage.setItem('jobPostObj',JSON.stringify(jobPostObj));
		$state.go("viewApplicants",{reqJSON:reqJSON});
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
 			//vm.data.message = 'Something went wrong. Please try again.';
		})
	}
	
	vm.fetchJobPostDetails = function(){
		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/findJobsByCompany", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.data.jobPostList = res.data.Response;
 				console.log(res.data.Response);
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Something went wrong. Please try again.';
		})
	}


 	vm.fetchJobPostDetails();
}

app.controller('CompanyHomeController',CompanyHomeControllerFn);
