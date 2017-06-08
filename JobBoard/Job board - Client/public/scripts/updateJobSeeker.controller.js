var app = angular.module('JobBoard');
function UpdateJobSeekerControllerFn($state,$http,$uibModal,$scope) {
	
	var vm = this;
	vm.user = {};
	vm.update = {};
	vm.home = {};
	vm.home.message = '';
	vm.update.educationList = [];
	vm.update.profileImagePath = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png";
	$scope.profileImagePath;

	$scope.$watch('profileImagePath', function(newValue, oldValue) {
  		//$scope.counter = scope.counter + 1;
	});

	vm.fetchJobSeekerDetails = function(){
		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/getJobSeekerDetails", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.update = res.data.Response;
 				vm.update.educationList = res.data.Response.education
 				vm.update.profileImagePath = res.data.Response.profileImagePath;
 				console.log(res.data.Response);
 				console.log("image "+res.data.Response.profileImagePath);
 				console.log("retrived image "+vm.update.profileImagePath);
 				//console.log(vm.update);
 			}
 		}).catch(function(res) {
 			vm.home.message = 'Something went wrong. Please try again.';
		})
	}

	vm.addEducation = function() {
		var educationTempEmpty = {
			"school": "",
			"degree": "",
			"fieldOfStudy": "",
			"gpa": ""
		}
		vm.update.educationList.push(educationTempEmpty)
	}

	vm.removeEducation = function(educationObj) {
		vm.update.educationList.splice( vm.update.educationList.indexOf(educationObj), 1 );
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


	vm.updateProfilePic = function(){
		console.log("inside file picker");
		filepicker.pick(
		  {
		    mimetype: 'image/*',
		    container: 'modal',
		    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
		  },
		  function(Blob){
			console.log("got the image");
		    console.log(JSON.stringify(Blob.url));
		    vm.update.profileImagePath=Blob.url;
		    $scope.profileImagePath = vm.update.profileImagePath;
		    $scope.$apply()
		    console.log(vm.update.profileImagePath);
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });
	}



	vm.updateJobSeeker = function() {
 		
		console.log(vm.update.educationList);

 		var reqJSON = {
			"data": {
				"email": vm.update.emailId,
				"firstName": vm.update.firstName,
				"lastName": vm.update.lastName,
				"selfIntroduction": vm.update.selfIntroduction,
				"phone": vm.update.phone,
				"skills": vm.update.skills,
				"workExp": vm.update.workExp,
				"password": vm.update.password,
				"profileImagePath": vm.update.profileImagePath,
				"education": vm.update.educationList
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/updateJobSeeker",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			
 			if(res.status==200){
 				vm.update = {};
 				vm.home.message = 'Your details are successfully updated.';
 				vm.fetchJobSeekerDetails();

 			}
 		}).catch(function(res) {
 			vm.home.message = 'Please enter proper details.';
		})
 	} 

 	vm.cancelJobSeeker = function() {
 		$state.go("jobSeekerHome");
 	} 

 	vm.fetchJobSeekerDetails();

}

app.controller('UpdateJobSeekerController',UpdateJobSeekerControllerFn);