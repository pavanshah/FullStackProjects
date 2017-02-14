var app = angular.module('Airbnb',['ui.bootstrap','ui.router','google.places','nvd3','ngMaterial','ngAnimate','ngAria','ngRoute','ngSanitize','rzModule']);
filepicker.setKey("As4LSqupJTjVvBXkoAMnPz");
app.config(function($stateProvider, $urlRouterProvider) {


	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home',{
		url:"/",
		templateUrl:"public/views/home.html",
		controller:"HomeController",
		controllerAs:"vm"
	})

	.state('viewListings',{
		url:"/viewListings",
		templateUrl:"public/views/viewListings.html",
		controller:"ViewListingsController",
		controllerAs:"vm",
		params: {
            filters: null
        },
	})

	
	.state('admin',{
		url:"/admin",
		templateUrl:"public/views/admin.html",
		controller:"AdminController",
		controllerAs:"vm"
	})
	.state('adminProfileView',{
		url:"/adminProfileView",
		templateUrl:"public/views/AdminProfileView.html",
		controller:"AdminProfileViewController",
		controllerAs:"vm"
	})
	.state('adminBillView',{
		url:"/adminBillView",
		templateUrl:"public/views/adminBillView.html",
		controller:"AdminBillViewController",
		controllerAs:"vm"
	})
	
	.state('adminHostSearch',{
		url:"/adminHostSearch",
		templateUrl:"public/views/adminHostSearch.html",
		controller:"AdminHostSearchController",
		controllerAs:"vm"
	})
	
	.state('adminBillSearch',{
		url:"/adminBillSearch",
		templateUrl:"public/views/adminBillSearch.html",
		controller:"AdminBillSearchController",
		controllerAs:"vm"
	})
	
	.state('adminLogin',{
		url:"/adminLogin",
		templateUrl:"public/views/adminLogin.html",
		controller:"AdminLoginController",
		controllerAs:"vm"
	})
	.state('propertyDetails',{
		url:"/propertyDetails",
		templateUrl:"public/views/propertyDetails.html",
		controller:"PropertyDetailsController",
		controllerAs:"vm",
		params:{
			property:null
		}
	})
	
	.state('becomeahost',{
		url:"/becomeahost",
		templateUrl:"public/views/becomeahost.html",
		controller:"BecomeAHostController",
		controllerAs:"vm"
	})

	.state('checkout', {
		url:"/checkout",
		templateUrl:"public/views/checkout.html",
		params:{
			property:null
		},
		controller:"CheckoutController",
		controllerAs:"vm"
	})

	.state('orderSuccess',{
		url:"/orderSuccess",
		templateUrl:"public/views/orderSuccess.html",
		params:{
			trip:null
		},
		controller:"orderSuccessController",
		controllerAs:"vm"
	})

	.state('userBill',{
		url:'/userBill',
		templateUrl:"public/views/finalReciept.html",
		params:{
			trip:null
		},
		controller:"BillController",
		controllerAs:"vm"
	})
	.state('userHome',{
		url:'/userHome',
		templateUrl:"public/views/userHome.html",
		params:{
			trip:null
		},
		controller:"TripsController",
		controllerAs:"vm"
	})
	.state('logout',{
		url:'/logout',
		templateUrl:'public/views/logoutPage.html'
	})
	.state('userProfile',{
		url:'/userProfile',
		templateUrl:'public/views/userProfile.html',
		controller:"UpdateProfileController",
		controllerAs:"vm"
	})
	.state('hostProfile',{
		url:'/hostProfile',
		templateUrl:'public/views/hostProfile.html',
		controller:"hostProfile",
		controllerAs:"vm"
	})
	.state('addProperty',{
		url:'/addProperty',
		templateUrl:'public/views/addProperty.html',
		controller:"AddPropertyController",
		controllerAs:"vm"

	})

	.state('hostAnalytics',{
		url:"/hostAnalytics",
		templateUrl:"public/views/hostAnalytics.html",
		controller:"hostAnalyticsController",
		controllerAs:"vm"
	})

	.state('auctionablePropertyDetails',{
		url:"/auctionablePropertyDetails",
		templateUrl:"public/views/auctionablePropertyDetails.html",
		controller:"AuctionablePropertyDetailsController",
		controllerAs:"vm",
		params:{
			property:null
		}
	})
	.state('HostHomePageController',{
		url:"/hostHomePage",
		templateUrl:"public/views/hostHomePage.html",
		controller:"hostHomePageController",
		controllerAs:"vm"
	})
	.state('bidConfirmationPage',{
		url:"/bidCofirmationPage",
		templateUrl:"public/views/bidCofirm.html"
		
	})
	.state('hostCardDetails',{
		url:"/hostCardDetails",
		templateUrl:"public/views/HostCardDetails.html",
		controller:"hostCardDetails",
		controllerAs:"vm"
	})
	.state('hostProfilePhotoAndVideo',{
		url:"/hostProfilePhotoAndVideo",
		templateUrl:"public/views/hostProfilePhotoAndVideo.html",
		controller:"hostProfilePhotoAndVideo",
		controllerAs:"vm"
	})
	.state('viewUserBids',{
		url:"/viewUserBids",
		templateUrl:"public/views/viewUserBids.html",
		controller:"ViewUserBidsController",
		controllerAs:"vm"
	})
	.state('hostRatingAndReviews',{
		url:"/hostRatingAndReviews",
		templateUrl:"public/views/hostRatingAndReviews.html",
		controller:"hostRatingAndReviews",
		controllerAs:"vm"
	})
	 
	//$location.path('/prelogin');
	//html5mode(true);n
	
});

app.run(function($rootScope,$http,$state,loginService) {
  $rootScope.$on('$stateChangeStart',
   function(event, toState  , toParams
                   , fromState, fromParams) 
    {// for admin states
      if(toState.name=="admin" || toState.name=="adminProfileView" ||toState.name=="adminBillView" ||toState.name=="adminHostSearch" ||
      	toState.name=="adminBillSearch"){
      	$http.get("/isUserLoggedIn").
      	then(function(response) {
      		if(response.status==200){
      			if(response.data.UserType!="Admin" && response.data.UserType!="admin"){
      				event.preventDefault();
      				loginService.logout();
      				$state.go("home");
      			}
      		}
      	},function (err) {
      		event.preventDefault();
      		$state.go("home");
      	})
      }
      /// for user states
      else if(toState.name=="checkout" || toState.name=="orderSuccess" ||toState.name=="userHome" ||
      	toState.name=="userProfile" ||
      	toState.name=="bidCofirmationPage" ||
      	toState.name=="viewUserBids"){
      	$http.get("/isUserLoggedIn").
      	then(function(response) {
      		if(response.status==200){
      			if(response.data.UserType!="User" && response.data.UserType!="user"){
      				event.preventDefault();
      				loginService.logout();
      				$state.go("home");
      			}
      		}
      	},function (err) {
      		event.preventDefault();
      		$state.go("home");
      	})
      }

      else if(toState.name=="hostRatingAndReviews" || toState.name=="hostProfilePhotoAndVideo" ||toState.name=="hostCardDetails" ||toState.name=="HostHomePageController" ||
      	toState.name=="hostAnalytics" ||
      	toState.name=="addProperty" ||
      	toState.name=="hostProfile")
      {
      	$http.get("/isUserLoggedIn").
      	then(function(response) {
      		if(response.status==200){
      			if(response.data.UserType!="Host" && response.data.UserType!="host"){
      				event.preventDefault();
      				loginService.logout();
      				$state.go("home");
      			}
      		}
      	},function (err) {
      		event.preventDefault();
      		$state.go("home");
      	})
      }
    });
});



app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});
