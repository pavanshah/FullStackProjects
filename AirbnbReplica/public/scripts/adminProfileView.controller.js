var app = angular.module('Airbnb');


function AdminProfileViewControllerFn($state,$scope,$http,$rootScope,$mdDialog,$sce) {	
	var vm = this;
	console.log("loaded data");
	console.log($rootScope.showProfile);
	$scope.firstname = "";
	$scope.reviews = [];
	$scope.showSuccess = false;	
	$scope.image = $sce.trustAsResourceUrl("http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png");
	
	$scope.authorize = function(){
		
		console.log("Authorize user");
		$scope.authuser = {"id":$rootScope.showProfile}; 
		$http({
			  method: 'POST',
			  url: '/authorizeUser',
			  data: $scope.authuser
			  			  			  
			}).then(function successCallback(response) {
				console.log(response.data);
				if(response.data.result == "success"){
					$scope.status = "active";
					$scope.showSuccess = true;
					
				}
			})

	}
	
	$scope.deleteUser = function(){
		console.log("Delete user");
		$scope.authuser = {"id":$rootScope.showProfile}; 
		$http({
			  method: 'POST',
			  url: '/deleteUserFromAdmin',
			  data: $scope.authuser
			  			  			  
			}).then(function successCallback(response) {
				console.log(response.data);
				if(response.data.result == "success"){
					
					var confirm = $mdDialog.confirm()
	                  .title('Successfully deleted the user!')
	                  .textContent("Lets go back to the list")
	                  .ariaLabel('Deleted!')
	                  
	                  .ok('Ok');
	                  
	                  $mdDialog.show(confirm).then(function() {
	                     console.log("Do u think it ll work");
	     				window.location.assign("#/adminHostSearch");
	                     }, function() {
	                    	 console.log("it worked");
	                  });
					
				}
			})

	}
	
	$scope.$on('$viewContentLoaded', function() {
		$scope.hostQuery = {"id":$rootScope.showProfile};
		
		$http({
			method : "GET",
			url : '/getProfileForAdmin',
			params : $scope.hostQuery 
		}).success(function(details) {
			console.log("got output from backend");			
			//console.log(details.result[0].profilepic);
			
			if(typeof details.result[0].profilepic === "undefined"){
				console.log("this is undefined");
				$scope.image = $sce.trustAsResourceUrl("http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png");
			}
			else{
				console.log("Got image");
				$scope.image = $sce.trustAsResourceUrl(details.result[0].profilepic);				
				
			}
			console.log(details.result[0].firstname);
			$scope.firstname = details.result[0].firstname;
			console.log("firstname is:"+$scope.firstname );
			$scope.lastname = details.result[0].lastname;
			console.log("lasname is:"+vm.lastname );
			$scope.status = details.result[0].user_status;
			console.log("birtdate");
			console.log(details.result[0].birthdate);
			var dateVal = details.result[0].birthdate || "12/12/1991";
			var dateObj = new Date(dateVal);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			$scope.birthdate = month + '/'+day+'/'+year;
			
			var streetVal = "";
			var cityVal ="";
			var stateVal ="";
			var countryVal ="";
				
			if(typeof details.result[0].address !== "undefined"){
				streetVal = details.result[0].address.street || "";
				cityVal = details.result[0].address.city || "";
				stateVal = details.result[0].address.state || "";
				countryVal =  details.result[0].address.country || "";
				$scope.address = streetVal+','+cityVal+','+stateVal+','+countryVal;
			}
			else{
				$scope.address = "";
			}
			
			
			
			$scope.rating = details.result[0].avgrating || "";
			$scope.phone = details.result[0].phone|| "";
			$scope.email = details.result[0].email || "";
			$scope.reviews = details.result[0].Reviews;
			
			
			
		})
		
	})
}


app.controller('AdminProfileViewController',AdminProfileViewControllerFn);