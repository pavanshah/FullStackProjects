var app = angular.module('JobBoard');
function updateJobPostControllerFn($state,$http,$uibModal,$stateParams) {
	
	var vm = this;
	vm.user = {};
	vm.data = {};
	vm.home = {};
	vm.data1={};
	vm.home.message = '';
	vm.data1.allowFilled=false;
	vm.data1.allowCancelled=true;
	vm.myvars={};
	vm.myvars.applicantList=['a'];

	myfunction = function(){
		console.log("myfunction: " ,vm.myvars.applicantList);

	 	for (var tempObj in vm.myvars.applicantList) { 
				    	
	    	if(vm.myvars.applicantList[tempObj].status == 'OFFERACCEPTED'){
	    		console.log("inside: " + vm.myvars.applicantList[tempObj].status);
	    		vm.data1.allowCancelled=false;
	    		vm.data1.allowFilled=true;
			}
			
	    }
    }

	myfetchJobApplicants = function(){

		var reqJSON = {
			"data":{
				"jobPostId":vm.data.jobPostId
			}
		}

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobPostApplications",reqJSON,{
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){

 				vm.myvars.applicantList = res.data.result;
 				myfunction();
 				//window.localStorage.setItem('vm.myvars.applicantList',JSON.stringify(res.data.result));
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Something went wrong. Please try again.';
		})
	}

	
	vm.updateJobPost = function() {
 		
 		var reqJSON = {
			"data": {
				"jobId": vm.data.jobPostId,
				"title": vm.data.title,
				"description": vm.data.description,
				"office_location": vm.data.officeLocation,
				"responsibilities": vm.data.responsibilities,
				"salary": vm.data.salary,
				"status":""
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateJobByCompany",reqJSON, {
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



 	vm.cancelJobPost = function() {
 		
 		var reqJSON = {
			"data": {
				"jobId": vm.data.jobPostId,
				"title": vm.data.title,
				"description": vm.data.description,
				"office_location": vm.data.officeLocation,
				"responsibilities": vm.data.responsibilities,
				"salary": vm.data.salary,
				"status":"CANCELLED"
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateJobByCompany",reqJSON, {
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


 	vm.markFillJobPost = function() {
 		
 		var reqJSON = {
			"data": {
				"jobId": vm.data.jobPostId,
				"title": vm.data.title,
				"description": vm.data.description,
				"office_location": vm.data.officeLocation,
				"responsibilities": vm.data.responsibilities,
				"salary": vm.data.salary,
				"status":"FILLED"
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateJobByCompany",reqJSON, {
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

 	vm.goToViewApplicants = function(jobPostObj){
 		jobPostObj = JSON.parse(window.localStorage.getItem('jobPostObj'))
		var reqJSON = {};
		reqJSON.jobPostId = jobPostObj.jobPostId;
		reqJSON.jobPostObj = JSON.parse(window.localStorage.getItem('jobPostObj'));
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
 			vm.data.message = 'Something went wrong. Please try again.';
		})
	}


	vm.cancelCreateJobPost = function() {
		
		//window.localStorage.setItem('vm.myvars.applicantList',JSON.stringify(""));
 		$state.go("companyHome");
 	} 


 	vm.data = JSON.parse(window.localStorage.getItem('jobPostObj'));
 	myfetchJobApplicants();

 	
    
	
}

app.controller('updateJobPostController',updateJobPostControllerFn);