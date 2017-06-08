var app = angular.module('CommunityServer');
function LoginControllerFn($state,$http,$uibModal,loginService) {
	
	var vm = this;
	vm.user = {};
	vm.tabs = {active:"login"};
	vm.newUser = {};

 	vm.login = function(reqJSON) {
 		
 		if(angular.isUndefined(reqJSON)){
 			var reqJSON = {
				"data": {
					"email": vm.user.email,
					"password": vm.user.password
					
				}
			}

 		}



 		console.log("email "+vm.user.email);

 		
 		$http.post("/signIn",reqJSON).
 		then(function(res) {

			if(res.status==200){
				console.log(res.data.data);
				loginService.storeUserData(res.data.data);
				var UserType = res.data.data.UserType;
				if(UserType=="ServiceOwner" || UserType=="ClusterOwner"){
					$state.go("moderatorHome");
				}
				else{
					$state.go("home");	
				}
				
			}
 		},function(error) {
 			vm.error=error;
 		})
 	} 

 	var fetchClusters = function () {
 		$http.get('/getListOfCluster').
 		then(function(res){
 			vm.clusterList = res.data.result;
 			console.log(vm.clusterList);
 		})
 	}

 	vm.selectCluster = function(cluster) {
 		
 		vm.newUser.cluster = cluster.cluster_id;
 		vm.selectedCluster = cluster.cluster_name;
 	}

 	fetchClusters();

 	vm.register = function() {
 		
 		//vm.newUser.cluster = "b0c65c4d-3f0a-4a49-aea5-5b7f565e42f0";
 		var reqJSON = {
			"data": vm.newUser
		}

		console.log(vm.newUser);

 		$http.post("/signUp",reqJSON).
 		then(function(res) {
 			if(res.status==200){
 				console.log("signup successful");
 				vm.tabs.active="login";
 				vm.login(reqJSON);
 			}
 		})
 	}

 	vm.logOut = function () {
 		loginService.logOut();
 	} 
}

app.controller('LoginController',LoginControllerFn);