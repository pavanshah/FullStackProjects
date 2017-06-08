var app = angular.module('JobBoard');
function LoginControllerFn($state,$http,$uibModal,$scope) {
	
	var vm = this;
	vm.user = {};
	vm.register = {};
	vm.home = {};
	vm.home.message = '';
	vm.register.educationList = [];

	vm.register.profileImagePath = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png";
	$scope.profileImagePath;
	$scope.invalidflag = true;
	$scope.invalidflag1 = true;
	$scope.validflag = true;

	$scope.$watch('profileImagePath', function(newValue, oldValue) {
  		//$scope.counter = scope.counter + 1;
	});


	vm.addEducation = function() {
		var educationTempEmpty = {
			"school": "",
			"degree": "",
			"fieldOfStudy": "",
			"gpa": ""
		}
		vm.register.educationList.push(educationTempEmpty)
	}

	vm.removeEducation = function(educationObj) {
		vm.register.educationList.splice( vm.register.educationList.indexOf(educationObj), 1 );
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
		    vm.register.profileImagePath=Blob.url;
		    $scope.profileImagePath = vm.register.profileImagePath;
		    $scope.$apply()
		    console.log(vm.register.profileImagePath);
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });
	}


	vm.registerJobSeeker = function() {
 		
 		var reqJSON = {
			"data": {
				"email": vm.register.emailId,
				"firstName": vm.register.firstName,
				"lastName": vm.register.lastName,
				"selfIntroduction": vm.register.selfIntroduction,
				"phone": vm.register.phone,
				"skills": vm.register.skills,
				"workExp": vm.register.workExp,
				"password": vm.register.password,
				"profileImagePath": vm.register.profileImagePath,
				"education": vm.register.educationList
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/signUpJobSeeker",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			
 			if(res.status==200){
 				vm.register = {};
 				vm.home.message2 = 'Please go to verification link sent to your email.';
 				$scope.validflag = false;
 				$state.go("jobSeekerLogin");
 			}
 		}).catch(function(res) {
 			if(res.status=400){
 				vm.home.message2 = 'User already exists.';
 				$scope.invalidflag1 = false;
 			}else{
 				vm.home.message2 = 'Please enter proper details.';
 				$scope.invalidflag1 = false;
 			}
		})
 	} 

 	vm.login = function() {
 		
 		var reqJSON = {
			"data": {
				"email": vm.user.emailId,
				"password": vm.user.password,
				"usertype": "JobSeeker" // or “company”
			}
		}


 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/login",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			$scope.invalidflag = false;
 			vm.home.message = 'Incorrect Credentials';
		})
 	} 
}

app.controller('LoginController',LoginControllerFn);