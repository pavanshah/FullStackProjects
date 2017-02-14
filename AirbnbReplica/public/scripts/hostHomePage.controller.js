var app = angular.module('Airbnb');


function HostHomePageFn($state,$http) {	
	var vm = this;
	//vm.value = 1;
	vm.hostProfile = function(){
		window.location.assign("#/hostProfile");	
	}
	
	
		
}

app.controller('hostHomePageController',HostHomePageFn);
