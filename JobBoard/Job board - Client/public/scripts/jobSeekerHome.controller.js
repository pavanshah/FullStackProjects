var app = angular.module('JobBoard');
filepicker.setKey("Agm49GXXQQKecLwsP74odz");
function JobSeekerHomeControllerFn($state,$http,$uibModal) {
	
	var vm = this;

	vm.data={};
	vm.data.selectedCompanyList = [];
	vm.data.selectedLocationList = [];
	vm.data.locationList = ['Washington', 'San Jose', 'Chicago', 'New York', 'Newark', 'Arlington', 'Dallas','Adelanto','Agoura Hills','Alameda','Alhambra','Aliso Viejo','Alpine','Altadena','Alturas','American Canyon','Anaheim','Anaheim Hills','Anderson','Angels Camp','Angelus Oaks','Antioch','Apple Valley','Aptos','Arcadia','Arcata','Arnold','Arroyo Grande','Artesia','Atascadero','Auburn','Avalon','Avila Beach','Azusa','Baker','Bakersfield','Balboa Island','Baldwin Park','Banning','Barstow','Beaumont','Bell Gardens','Bellflower','Belmont','Belmont Shore','Ben Lomond','Benicia','Berkeley','Bermuda Dunes','Beverly Hills','Big Bear Lake','Big Sur','Bishop','Blythe','Bodega','Bodega Bay','Borrego Springs','Boyes Hot Springs','Brawley','Brea','Brentwood','Brisbane','Buck Meadows','Buellton','Buena Park','Burbank','Burlingame','Buttonwillow','Calabasas','Calexico','California City','Calimesa','Calistoga','Camarillo','Cambria','Cameron Park','Campbell'];
	vm.data.searchList = ['Search by Text', 'Search by Filters'];
	vm.data.showSearchByText = true;

	vm.changeOfSearchType=function(){
		vm.data.showSearchByText = true;

		if(vm.data.selectedSearchList == 'Search by Filters'){
			vm.data.showSearchByText = false;
		}
	}

	vm.getSearchResultsByText = function() {

		if(vm.data.searchText == undefined || vm.data.searchText == ""){
			vm.data.searchText = "";
		}



		var reqJSON = {
			"data": {
				"keyword": vm.data.searchText 
			}
		}
		reqJSON.type = "text";
		$state.go("jobSearchResults",{reqJSON:reqJSON});

		/*$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/searchByText",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				console.log(res.data.Response);
 				//$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			if(res.status == 404){
 				vm.data.message ="No results found.";
 			}
 			else{
 				vm.data.message = 'Please enter proper details.';
 			}
 			
		})*/
	}

	vm.getSearchResultsByFilter = function() {
		var type="none";
		var start="";
		var end="";

		if(vm.data.searchSalarySingleVal != undefined && vm.data.searchSalarySingleVal != ''){
			type="single_value";
			start=vm.data.searchSalarySingleVal;
			end="";
		}else if(vm.data.searchRangeStart != undefined && vm.data.searchRangeStart != '' && (vm.data.searchRangeEnd == undefined || vm.data.searchRangeEnd =='' ) ){
			type="only_start";
			start=vm.data.searchRangeStart;
			end="";
		}else if((vm.data.searchRangeStart == undefined || vm.data.searchRangeStart == '') && vm.data.searchRangeEnd != undefined && vm.data.searchRangeEnd !='' ){
			type="only_end";
			start="";
			end=vm.data.searchRangeEnd;
		}else if(vm.data.searchRangeStart != undefined && vm.data.searchRangeEnd != undefined && vm.data.searchRangeStart != '' && vm.data.searchRangeEnd !='' ){
			type="both";
			start=vm.data.searchRangeStart;
			end=vm.data.searchRangeEnd;
		}

		console.log(vm.data.selectedCompanyList);

		var modifiedCompanyList = [];

		for(var i=0;i<vm.data.selectedCompanyList.length;i++) {
		  modifiedCompanyList.push(vm.data.selectedCompanyList[i].name);
		}

		var reqJSON = {
			"data": {
				"companies": modifiedCompanyList,
				"location": vm.data.selectedLocationList,
				"range": {
					"start": start,
					"end": end,
					"type": type 
				}	
			}
		}
		reqJSON.type = "filter";
		$state.go("jobSearchResults",{reqJSON:reqJSON});
 	/*	$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/searchByFilter",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				console.log(res.data.Response);
 				//$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			if(res.status == 404){
 				vm.data.message ="No results found.";
 			}
 			else{
 				vm.data.message = 'Please enter proper details.';
 			}
 			
		})*/
	}

	vm.getCompanies = function() {

 		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/findAllCompanies", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.data.companyList = res.data.Response;
 			}
 		}).catch(function(res) {
 			vm.data.message = 'Something went wrong. Please reload the page.';
		})
	} 

	vm.logout = function() {

 		$http.get("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/logout", {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				$state.go("jobSeekerLogin");
 			}
 		}).catch(function(res) {
 			vm.data.message = 'Something went wrong. Please try again.';
		})
	}

	vm.getCompanies();

}

app.controller('JobSeekerHomeController',JobSeekerHomeControllerFn);
