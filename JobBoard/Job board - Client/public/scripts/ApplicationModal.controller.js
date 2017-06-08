var app = angular.module("JobBoard");

function ApplicationModalControllerFn($uibModalInstance,$http,job) {
	var vm = this;
	vm.user = {};
	vm.view = "application";
	//vm.user.UserType = "User"
	//vm.signupView = "signupMethod";
	vm.job = job;
	vm.data ={};
	vm.data.message ={};
  
	vm.dismiss = function () {
		$uibModalInstance.dismiss();
  	};

  		


  	/*vm.apply = function() {
  		$uibModalInstance.close("profile");
  	}*/

  	vm.uploadResume = function(){
  		console.log("in resume upload");
  		$uibModalInstance.dismiss();
		filepicker.pick(
		  {
		    extension: '.pdf',
		    
		    services: ['COMPUTER','GOOGLE_DRIVE']
		  },
		  function(Blob){
		    console.log(JSON.stringify(Blob.url));
		    applyWithResume(JSON.stringify(Blob.url))
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });

	}

	var applyWithResume = function(resumeURL) {
 		var applicationJSON = {
 			"data":{
					"jobPostId":job.jobPostId,
					"applyWithResumeOrProfile":"Resume",
					"resume":resumeURL		
				}

 		}

 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/applyToJobPost",applicationJSON).
 		then(function(res) {
 			if(res.status==200){
 				
 				vm.view = "success";
 				alert("Applied Successfully!")
 			}
 		}).catch(function(res) {
 			console.log(res);
 			vm.message = 'Something went wrong please try again: ' + res.data.result;
 			
		})
 	}

 	vm.applyWithProfile = function() {
 		jobId = "4028e3815c00b671015c00b98a3b0001";
 		var applicationJSON = {
 			"data":{
					"jobPostId":job.jobPostId,
					"applyWithResumeOrProfile":"Profile",
					"resume":null		
				}

 		}

 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/applyToJobPost",applicationJSON).
 		then(function(res) {
 			if(res.status==200){
 				vm.view = "success";
 				
 			}
 		}).catch(function(res) {
 			console.log(res);
 			vm.data.message.newmessage = 'Something went wrong please try again: ' + res;
 			
		})
 	}


}

app.controller('ApplicationModalController',ApplicationModalControllerFn)