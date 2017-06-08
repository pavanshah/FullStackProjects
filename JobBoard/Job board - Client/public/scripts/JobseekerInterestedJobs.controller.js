var app = angular.module('JobBoard');
filepicker.setKey("Agm49GXXQQKecLwsP74odz");
function JobseekerInterestedJobsControllerFn($state,$http,$uibModal,$stateParams) {
	
	var vm = this;
	
	vm.data={};

	vm.getInterestedJobPost = function() {

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobSeekerInterestedList",{}, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.interestedJobs = res.data.result;
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

	vm.openApplicationModal = function(job) {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'applicationModal.html',
	      	 size: "md",
	      	 controller:'ApplicationModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true,
	      	 resolve: {
				    job: function () {
				        return job;
				    }
	    	}
	    });

	     modalInstance.result.then(function (applicationType) {

		   //  vm.user = userData;
		    console.log("jobId",jobId);
		   	//applyWithProfile(jobId);
		     
		    }, function (err) {
		    
		});
		  
 	}


	
	vm.removeFromInterested = function(jobPost) {
		console.log(jobPost)
		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/markAsInterested",{
			data:{
				jobPostId:jobPost.jobPostId
			}
		}, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
  		then(function(res) {
 			if(res.status==200){
 				vm.getInterestedJobPost();
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
	/*vm.changeStatus = function(application, status) {
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
	}*/

	/*vm.getApplications = function() {

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobSeekerInterestedList",{}, {
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
	}*/

	

	/*vm.logout = function() {

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

	*/
	vm.getInterestedJobPost();


}

app.controller('JobseekerInterestedJobsController',JobseekerInterestedJobsControllerFn);