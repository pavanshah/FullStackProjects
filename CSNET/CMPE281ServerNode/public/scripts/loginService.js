var app = angular.module("CommunityServer");


function loginServiceFn($http,$state,$rootScope) {
	
	var userData = {};


	function storeUserData(userInfo) {
		console.log("Storing..",userInfo);
		userData = userInfo;
		window.localStorage.setItem("userData",JSON.stringify(userInfo));
	}

	function getUserData() {
		console.log("retrieving..",userData);
		if(angular.isUndefined(userData.firstname)){
			var _userData_ = JSON.parse(window.localStorage.getItem("userData"));
			console.log(_userData_);
			if(angular.isUndefined(_userData_) || _userData_ == null){
				this.logout();
			}
			else{
				this.storeUserData(_userData_);
			}
		}
		return userData;
	}

	
	function logout() {
		return $http.post("/logout").
			then(function(response) {
				this.userData = {};
				window.localStorage.removeItem("userData");
				$state.go("login");
				return response;
			})
	}

	

	return{
		storeUserData:storeUserData,
		getUserData:getUserData,
		logout:logout
		
	}
}



app.service('loginService',loginServiceFn);
