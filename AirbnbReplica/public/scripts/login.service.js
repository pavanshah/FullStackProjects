var app = angular.module("Airbnb");


function loginServiceFn($http,bookingDataService,$state,$rootScope) {
	
	var userData = {};

	function login(userData) {
		
		return $http.post("/userLogIn",userData).
		then(function(response) {
			console.log("response",response);
			
			if(response.status==200){
				if(response.data.userLoggedIn){
					return response.data.userLoggedIn;
				}
			}
		},function(err) {
			console.log("err",err);
			return err;
		})
	}

	function getUserProfile() {
		return $http.get("/getUserProfile").
		then(function(response) {
			if(response.status==200){
				userData = response.data.user;
				
				if(userData.UserType=="Host" || userData.UserType=="host"){
					$state.go("becomeahost");
				}
				if(userData.UserType=="Admin" || userData.UserType=="admin"){
					$state.go("admin");
				}
				
				return userData;
			}
		},function(err) {
			return err;
		})
	}

	function logout() {
		return $http.get("/logout").
			then(function(response) {
				userData = {};
				$rootScope.$emit('userLoggedOut');
				bookingDataService.deleteBooking();
				
				return response;
			})
	}

	function signup(userData) {

		return $http.post("/userSignup",{user:userData}).
		then(function(response) {
			
			return response;
			
		})
	}

	return{
		login:login,
		getUserProfile:getUserProfile,
		logout:logout,
		signup:signup
	}
}



app.service('loginService',loginServiceFn);
