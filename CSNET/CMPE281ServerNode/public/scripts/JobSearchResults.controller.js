var app = angular.module('JobBoard');
filepicker.setKey("Agm49GXXQQKecLwsP74odz");
function JobSearchResultsControllerFn($state,$http,$uibModal) {
	
	var vm = this;

	vm.openApplicationModal = function(jobId) {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'applicationModal.html',
	      	 size: "md",
	      	 controller:'ApplicationModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true,
	      	 resolve: {
				    jobId: function () {
				        return jobId;
				    }
	    	}
	    });

	     modalInstance.result.then(function (applicationType) {

		   //  vm.user = userData;
		    console.log("jobId",jobId);
		   	applyWithProfile(jobId);
		     
		    }, function (err) {
		    
		});
		  
 	}

 	var applyWithProfile = function(jobId) {
 		jobId = "4028e3815c00b671015c00b98a3b0001";
 		var applicationJSON = {
 			"data":{
					"jobPostId":jobId,
					"applyWithResumeOrProfile":"Profile",
					"resume":null		
				}

 		}

 		$http.post("http://localhost:8080/applyToJobPost",applicationJSON).
 		then(function(res) {
 			if(res.status==200){
 				alert("Applied!");
 			}
 		})
 	} 
}

app.controller('JobSearchResultsController',JobSearchResultsControllerFn);