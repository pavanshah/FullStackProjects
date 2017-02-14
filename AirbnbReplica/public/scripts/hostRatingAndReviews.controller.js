var app = angular.module("Airbnb");


var HostRatingAndReviewsFn = function ($http,$state,$scope,tripsService,$mdDialog) {
	var vm = this;
	//$scope.reviewDiv = 0;
	vm.rate = 1;
  	vm.max = 5;
  	vm.isReadonly = false;
  	var response = [];
  	vm.hoveringOver = function(value) {
  	    vm.overStar = value;
  	    
  	  };
	
	
	var getHostTrips = function() {
		console.log("getting host trips");
		$http.get('/getHostTrips').then(function(response){
			response = response.data;
			console.log(response);
			if(response.length > 0){
				angular.forEach(response,function(response) {
					console.log("inside angular for each");
					console.log(response);
					if(!response.property.propertyPictures || response.property.propertyPictures.length==0){
						response.property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
			            }
					response.rating = 0;
		            response.rate = 1;
		            response.review = "";
		            response.reviewDiv = 0;
		            console.log(response);
		            if(response.HostReviews.length > 0)
					{
		            	console.log("Review exists"+response.Reviews);
	              		response.rating = 1;
	              		response.rate = response.HostReviews[0].ratings;// rating.data.result.ratings;
	              		response.review = response.HostReviews[0].feedback;// rating.data.result.feedback;
	              		response.photo = response.HostReviews[0].photo;
	              		if(response.photo == null)
	              		{
	              			response.photoFlag = 0;
	              		}	
	              		else
	              		{
	              			response.photoFlag = 1;
	              		}
	              		console.log(response.rating+":::"+response.rate+":::"+response.review);
					}
		            
				})
				
			}
			vm.trips = response;
		});
	};
	
	vm.submitReview = function(tripId) {
		console.log(vm.trips[tripId]);

		$http.post('/submitHostReviewForTrip',vm.trips[tripId]).
		then(function(response) {
			console.log("after posting the details");
			vm.trips[tripId].submitted = 1;
			console.log(vm.trips[tripId].submitted);
			var confirm = $mdDialog.confirm()
            .title('Successfully Updated Your Reviews!')
            .ariaLabel('Created!')
            .ok('Ok');
            
            $mdDialog.show(confirm).then(function() {
               console.log("Do u think it ll work");
               //window.location.assign("#/hostHomePage");
               }, function() {
              	 console.log("it worked");
            });
			if(response.status == 200)
			{
				vm.trips[tripId].submitted = 1;
				
			}
			else
			{
				vm.trips[tripId].submitted = 0;
			}
		});
	}
	
	vm.tripBill = function(tripId){
		console.log("inside order click");
		$state.go("userBill",{"trip":vm.trips[tripId]});
	}
	
	vm.rateHost = function(tripId) {
		
		var temp = vm.trips[tripId];
		vm.trips[tripId].reviewDiv = 1;
		
	}
	vm.uploadPic = function(tripId){
  		console.log("in photo upload");

		filepicker.pick(
		  {
		    mimetype: 'image/*',
		    container: 'modal',
		    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
		  },
		  function(Blob){
		    console.log(JSON.stringify(Blob.url));
		    //vm.user.profilepic=Blob.url;
		    vm.trips[tripId].photo = Blob.url;
		    console.log(vm.trips[tripId].photo);
		    //vm.trips[tripId].uploadButton = true;

		    //vm.UpdateProfile();
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });

	}
	/*vm.submitReview = function(tripId) {
		console.log(vm.trips[tripId]);

		$http.post('/submitHostReviewForTrip',vm.trips[tripId]).
		then(function(response) {
			if(response.status == 200)
			{
				vm.trips[tripId].submitted = 1;
			}
			else
			{
				vm.trips[tripId].submitted = 0;
			}
		});
	}*/
	getHostTrips();
};



app.controller("hostRatingAndReviews",HostRatingAndReviewsFn);