var app = angular.module('Airbnb');


function AdminBillViewControllerFn($state,$scope,$http,$rootScope) {	
	var vm = this;
	console.log("Get details for bill"+$rootScope.billid);
	
	$scope.getBillDetail = {id:$rootScope.billid};
	$http({
		method : "GET",
		url : '/getBillDetailAdmin',
		params : $scope.getBillDetail 
	}).success(function(details) {
		console.log("test output1");
		$scope.start = details.start;
		$scope.end = details.end;
		console.log(details.result);
		console.log(details.start);
		console.log(details.end);
		console.log("test output");
		$scope.billdate = details.result[0].billing_date;
		$scope.billid = details.result[0].billing_id;
		if(typeof details.result[0].user !== "undefined"){
			$scope.user = details.result[0].user.email;
		}
		
		$scope.amount = details.result[0].trip_amount;
		
		if(typeof details.result[0].property !== "undefined"){
			$scope.type = details.result[0].property.category;		
			$scope.property = details.result[0].property.description;
			$scope.address = details.result[0].property.address.formatted;
		}
		
		//$scope.values = details.result;
	})
}


app.controller('AdminBillViewController',AdminBillViewControllerFn);