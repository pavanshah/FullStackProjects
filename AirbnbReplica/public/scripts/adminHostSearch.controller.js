var app = angular.module('Airbnb');


function AdminHostSearchControllerFn($state,$scope,$http,$rootScope) {
	console.log("Inside admin host search");
	var vm = this;
	$scope.type = "Host";
	//$scope.totalItems = 64;
	//$scope.currentPage = 4;
	$scope.totalDisplayed = 20;
	
	$scope.fetchMore = true;
	$scope.recordCount = 0;
	

	$scope.showMore = function() {
	        $scope.totalDisplayed = $scope.totalDisplayed + 20;
	        if($scope.recordCount<= $scope.totalDisplayed){
				$scope.fetchMore = false;
			}
	 }
	
	vm.showProfile = function(id){
		console.log("profile clicked");
		console.log(id);
		$rootScope.showProfile = id;
		window.location.assign("/#/adminProfileView");
	}
	
	$scope.values = [];
	$scope.space = " ";
	$scope.hostQuery = {"type":"","address":"","query":"new","status":""};
	//$scope.hostQuery = {"type":"Host","address":"","query":"updated"};;
	//$scope.type = "Host";
	
	
	vm.searchDetails = function(){
		console.log(typeof $scope.type);
		console.log($scope.address);
		
		
		if(typeof $scope.type != "undefined" && $scope.type != ""){
			$scope.hostQuery.type = $scope.type;
			$scope.hostQuery.query = "updated";
		}
		if(typeof $scope.address != "undefined" && $scope.address != ""){
			$scope.hostQuery.address = $scope.address.address_components[0].long_name;
			$scope.hostQuery.query = "updated";
		}
		console.log("+++++++++++++");
		console.log($scope.authtype);
		if(typeof $scope.authtype != "undefined" && $scope.authtype != ""){
			console.log("----");
			$scope.hostQuery.status = $scope.authtype;
			$scope.hostQuery.query = "updated";
		}
		
		
		$http({
			method : "GET",
			url : '/getHostsForAdmin',
			params : $scope.hostQuery 
		}).success(function(details) {
			console.log(details.result);
			$scope.values = details.result;
			$scope.totalDisplayed = 20;
			$scope.recordCount = details.result.length;
			
			if($scope.recordCount<= $scope.totalDisplayed){
				$scope.fetchMore = false;
			}
			$scope.hostQuery.address = "";
			$scope.hostQuery.type = "";
			$scope.hostQuery.status = "";
		})
		
	}
	$scope.totalDisplayed = 20;
	$scope.showMore = function(argument) {
		$scope.totalDisplayed = $scope.totalDisplayed + 20;
	}
	
	$http({
		method : "GET",
		url : '/getHostsForAdmin',
		params : $scope.hostQuery 
	}).success(function(details) {
		console.log(details.result);
		$scope.totalDisplayed = 20;
$scope.recordCount = details.result.length;
		
		if($scope.recordCount<= $scope.totalDisplayed){
			$scope.fetchMore = false;
		}
		$scope.values = details.result;
	})

	if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
		return;
	} else {
		var lat = vm.travelLocation.geometry.location.lat();
		var long = vm.travelLocation.geometry.location.lng();
		$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long}});
	};
	
	
	
	
	
}	
app.controller('AdminHostSearchController',AdminHostSearchControllerFn);