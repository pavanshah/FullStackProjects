var app = angular.module('Airbnb');
function hostProfilePhotoAndVideoFn($state,$scope,$http,$sce) {
	var vm = this;
	vm.test = "new";
	//$scope.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/NVlYwUrmh1s");
	
$scope.$on('$viewContentLoaded', function() {
	//vm.populateHostProfile = function() {
		
		$http.get('/getHostDetails').then(function(response){
	    console.log(response.data);
			
			vm.host=response.data.user;
			$scope.video=$sce.trustAsResourceUrl(response.data.user.video);
			
			
			
			if(vm.host.video==undefined||vm.host.video==null){
				
				console.log("setting default image");
				$scope.videoUpload = true;
			} else {
				
				$scope.videoUpload = false;
				
			}
			
			if(vm.host.profilepic==undefined||vm.host.profilepic==null){
				console.log("setting default image");
				vm.host.profilepic="/public/images/generic-profile.png"
			} 
		});
});
	//}
	//vm.populateHostProfile();
//}
	vm.updateProfilePic = function(){
		filepicker.pick(
		  {
		    mimetype: 'image/*',
		    container: 'modal',
		    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
		  },
		  function(Blob){
			console.log("got the image");
		    console.log(JSON.stringify(Blob.url));
		    vm.host.profilepic=Blob.url;
		    console.log(vm.host.profilepic);
		    vm.UpdateProfile();
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });
	}
	vm.UpdateProfile = function() {
		console.log("calling updateProfile");
		$http.post('/updateHost',{"user":vm.host}).then(function(response){
			console.log(response.data);
			
			vm.showAlert=true;
		});
	}	
	
	$scope.updateHostVideo = function() {
		
		filepicker.pickMultiple(
			{mimetype: 'video/*',
			container: 'modal',
			services: ['COMPUTER']},
			
			  function(Blob){
			    console.log(JSON.stringify(Blob));
			    //for(i=0;i<Blob.length;i++){
			    	//vm.host.video = Blob[0].url;
			    	
			    	console.log("before");
			    	//console.log(vm.test);
			    	
			    	
			    //}
			    	console.log("after");
			    	console.log(Blob[0].url);
			    	//$scope.video = $sce.trustAsResourceUrl(Blob[0].url);
			    	$scope.$apply(function () {
			    		//$scope.newtest = Blob[0].url;
			    		$scope.video = $sce.trustAsResourceUrl(Blob[0].url);
			    		vm.host.video = Blob[0].url; 
			    		vm.UpdateProfile();
			        });
			    	
			    	console.log("yashasas");
			    //console.log(vm.host.video);
			  },
			  function(FPError){
			    console.log(FPError.toString());
			  });
	}
	
		
	

}
app.controller('hostProfilePhotoAndVideo',hostProfilePhotoAndVideoFn);