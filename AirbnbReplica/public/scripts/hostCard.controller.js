var app = angular.module('Airbnb');


function HostCardDetails($state,$scope,$http,$mdDialog) {	
	var vm = this;
	
	$scope.cardNumber='';
	$scope.expiryDate='';
	$scope.cvv=''
		
	$scope.saveCardDetails = function(){
		console.log($scope.cardNumber);
		console.log($scope.expiryDate);
		console.log($scope.cvv);
		
		$http.post('/updateHost',{"from":"card","cardNumber":$scope.cardNumber,
			"expiryDate":$scope.expiryDate,"cvv":$scope.cvv
			}).then(function(response){
				console.log(response.data);
				var confirm = $mdDialog.confirm()
	            .title('Successfully Updated Your Details!')
	            .textContent("Lets go back to the home")
	            .ariaLabel('Created!')
	            .ok('Ok');
	            
	            $mdDialog.show(confirm).then(function() {
	               console.log("Do u think it ll work");
	               window.location.assign("#/hostHomePage");
	               }, function() {
	              	 console.log("it worked");
	            });
			})
	};
	
	$scope.$on('$viewContentLoaded', function() {
		//$scope.getHostDetails = function(){
			
			
			console.log("geting host card details");
			$http.get('/getHostDetails').then(function(response){
				console.log(response);
				if(response.status == 200){
					console.log($scope.cardNumber);
					console.log($scope.expiryDate);
					console.log($scope.cvv);
					if(typeof response.data.user.card.expiryyear != 'undefined'|| response.data.user.card.expirymonth != 'undefined'){
						var expiryDate =response.data.user.card.expiryyear  +"/"+ response.data.user.card.expirymonth ;	
					}
					console.log(expiryDate);
					$scope.cardNumber = response.data.user.card.creditcard;
					$scope.expiryDate = expiryDate;
					$scope.cvv = response.data.user.card.cvv;
				}
				
		});
		});
	
		
}

app.controller('hostCardDetails',HostCardDetails);
