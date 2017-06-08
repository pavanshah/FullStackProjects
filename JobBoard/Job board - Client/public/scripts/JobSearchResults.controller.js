var app = angular.module('JobBoard');
filepicker.setKey("Agm49GXXQQKecLwsP74odz");
function JobSearchResultsControllerFn($state,$http,$uibModal,$stateParams) {
	
	var vm = this;
	vm.itemsPerPage = 10;
	vm.currentPage = 1;
	vm.data={};
	vm.data.selectedCompanyList = [];
	vm.data.selectedLocationList = [];
	vm.data.locationList = ['Canoga Park','Canyon Lake','Capistrano Beach','Capitola','Cardiff By The Sea','Carlsbad','Carmel Valley','Carmel-By-The-Sea','Carpinteria','Carson','Castaic','Castro Valley','Catalina Island','Cathedral City','Cayucos','Ceres','Cerritos','Chatsworth','Chester','Chico','Chino','Chino Hills','Chowchilla','Chula Vista','Claremont','Clearlake','Cloverdale','Clovis','Coalinga','Colton','Commerce','Compton','Concord','Corning','Corona','Corona del Mar','Coronado','Corte Madera','Columbia','Costa Mesa','Covina','Crescent City','Culver City','Cupertino','Cypress','Dana Point','Danville','Davis','Del Mar','Delano','Desert Hot Springs','Diamond Bar','Dinuba','Dixon','Dorris','Downey','Duarte','Dublin','Dunnigan','Dunsmuir','East Garrison','El Cajon','El Centro','El Cerrito','El Dorado Hills','El Monte','El Segundo','Elk Grove','Emeryville','Encinitas','Escalon','Escondido','Eureka','Exeter','Fairfield','Fair Oaks','Fallbrook','Fillmore','Firebaugh','Fish Camp','Folsom','Fontana','Foothill Ranch','Fort Bragg','Fortuna','Foster City','Fountain Valley','Fowler','Fremont','Fresno','Fullerton',' ','Galt','Garberville','Garden Grove','Gardena','Geyserville','Gilroy','Glen Ellen','Glendale','Glendora','Gold River','Galt','Goleta','Gorman','Goshen','Graeagle','Granada Hills','Grass Valley','Greenfield','Grover Beach','Guadalupe','Guerneville','Hacienda Heights','Half Moon Bay','Hanford','Harbor City','Hawaiian Gardens','Hawthorne','Hayward','Healdsburg',' ','Hemet','Hermosa Beach','Hesperia','Highland','Hollister','Hollywood','Huntington Beach','Huntington Park', 'Idyllwild','Imperial','Indian Wells','Irvine','Indio','Industry','Inglewood','Jackson','Jamestown','Jenner','Julian','Junction City','June Lake','  	 ','Kelseyville','Kenwood','Kernville','Kettleman City','King City','Kings Beach','Kingsburg','Kirkwood','La Habra','La Jolla','La Mesa','La Mirada','La Palma','La Puente','La Quinta','Lafayette','Laguna Beach','Laguna Hills','Laguna Woods','Lake Arrowhead','Lake Elsinore','Lake Forest','Lake San Marcos','Lakeport','Lakeside','Lancaster','Larkspur','Lathrop','Lawndale','Lebec','Lee Vining','Lemon Grove','Lemoore','Lincoln','Lindsay','Little Balboa','Little River','Livermore','Lodi','Loma Linda','Lomita','Lompoc','Lone Pine','Long Beach','Loomis','Los Alamitos','Los Alamos','Los Altos','Los Angeles','Los Banos','Los Gatos','Lost Hills','Lucerne','Lynwood','Madera','Malibu','Mammoth Lakes','Manhattan Beach','Manteca','Marina','Marina Del Rey','Mariposa','Martinez','Marysville','Maywood','McFarland','Mckinleyville','Mendocino','Menlo Park','Mentone','Merced','Mill Valley','Millbrae','Milpitas','Mission Hills','Mission Viejo','Modesto','Mojave','Mokelumne Hill','Monrovia','Monte Rio','Montebello','Monterey','Monterey Park','Moreno Valley','Moraga','Morgan Hill','Morro Bay','Moss Landing','Mount Shasta','Mountain View','Murrieta','Murphys','Napa','Naples','National City','Needles','Nevada City','Newark','Newbury Park','Newport Beach','Newport Coast','Nipton','Norco','North Hollywood','Norwalk','Novato','Oakdale','Oakhurst','Oakland','Oakley','Occidental','Oceano','Oceanside','Ojai','Olympic Valley','Ontario','Orange','Orcutt','Oroville','Oxnard','Pacific Beach','Pacific Grove','Pacifica','Pala','Palm Desert','Palm Springs','Palmdale','Palo Alto','Palo Verde','Paradise','Pasadena','Paso Robles','Patterson','Perris','Pescadero','Petaluma','Phelan','Pico Rivera','Pinole','Pismo Beach','Placentia','Placerville','Playa Del Rey','Pleasant Hill','Pleasanton','Point Arena','Pollock Pines','Pomona','Port Hueneme','Porterville','Poway','Ramona','Rancho Cordova','Rancho Cucamonga','Rancho Mirage','Rancho Palos Verdes','Rancho Santa Fe','Red Bluff','Redding','Redlands','Redondo Beach','Redway','Redwood City',' ','Rialto','Richmond','Ridgecrest','Rio Vista','Ripon','Riverside','Rocklin','Rohnert Park','Rosamond','Rosemead','Roseville','Rowland Heights','Rutherford','Sacramento','Saint Helena','Salida','Salinas','San Bernardino','San Bruno','San Carlos','San Clemente','San Diego','San Dimas','San Francisco','San Jose','San Juan Bautista','San Juan Capistrano','San Leandro','San Luis Obispo','San Marcos','San Mateo','San Pablo','San Pedro','San Rafael','San Ramon','San Simeon','San Ysidro','Santa Ana','Santa Barbara','Santa Clara','Santa Clarita','Santa Cruz','Santa Fe Springs','Santa Maria','Santa Monica','Santa Nella','Santa Paula','Santa Rosa','Santa Ynez','Santee','Saratoga','Sausalito','Scotts Valley','Seal Beach','Seaside','Sebastopol','Selma','Shasta','Shell Beach','Sherman Oaks','Shoshone','Signal Hill','Simi Valley','Solana Beach','Soledad','Solvang','Sonoma','Sonora','South El Monte','South Gate','South Lake Tahoe','South Pasadena','South San Francisco','Squaw Valley','Stanton','Stevenson Ranch','Stockton','Studio City','Summerland','Sun City','Sunnyvale','Sunset Beach','Susanville','Sutter Creek','Surfside','Swamis','Sylmar','Tahoe City','Tahoe Vista','Tarzana','Tehachapi','Temecula','The Sea Ranch','Thousand Oaks','Thousand Palms','Three Rivers','Tiburon','Tipton','Torrance','Tracy','Trinidad','Truckee','Tulare','Turlock','Tustin','Twentynine Palms','Ukiah','Union City','Universal City','Upland','Upper Lake','Vacaville','Valencia','Vallejo','Valley Center','Van Nuys','Venice','Ventura','Vernon','Victorville','Visalia','Vista','Volcano','Walnut','Walnut Creek','Wasco','Watsonville','Weaverville','Weed','West Covina','West Hollywood','West Sacramento','Westlake Village','Westley','Westminster','Westmorland','Westwood','Whittier','Williams','Willits','Willows','Wilmington','Windsor','Winterhaven','Woodland','Woodland Hills','Woodley Island','Yermo','Yorba Linda','Yosemite National Park','Yountville','Yreka','Yuba City','Yucca Valley','Yucaipa'];
	vm.data.searchList = ['Search by Text', 'Search by Filters'];
	vm.data.showSearchByText = true;

	function filterInterestedJobs(){
		
		vm.searchResults =_.map(vm.searchResults,function(job) {
								job.isInterested = false;
								_.each(vm.interestedJobs,function(interested) {
									if(interested.jobPost.jobPostId == job.jobPostId){
										job.isInterested = interested.status;
									}
								})
								return job;
							});
		console.log(vm.searchResults);
		//in search results, check if it matches job post id in interstedlist;
		//if yes insert true
	}

	vm.toggleInterested = function(jobPost) {
		console.log(jobPost);
		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/markAsInterested",{
			data:{
				jobPostId:jobPost.jobPostId
			}
		}, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
  		then(function(res) {
 			if(res.status==200){
 				vm.getInterestedJobPost();
 			}
 		}).catch(function(res) {
 			console.log(res);
 			if(res.status == 404){
 				vm.data.message ="No results found.";
 			}
 			else{
 				vm.data.message = 'Something went wrong please try again.';
 			}
 			
		})
	}

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

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/searchByText",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.searchResults = res.data.Response;
 				vm.getInterestedJobPost();
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
 			
		})
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
 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/searchByFilter",reqJSON, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.searchResults = res.data.Response;
 				vm.getInterestedJobPost();
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
 			
		})
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

	

	vm.openApplicationModal = function(job) {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'applicationModal.html',
	      	 size: "md",
	      	 controller:'ApplicationModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true,
	      	 resolve: {
				    job: function () {
				        return job;
				    }
	    	}
	    });

	     modalInstance.result.then(function (applicationType) {

		   //  vm.user = userData;
		    console.log("jobId",jobId);
		   	//applyWithProfile(jobId);
		     
		    }, function (err) {
		    
		});
		  
 	}

 	var applyWithProfile = function(jobId) {
 		jobId = "4028e3815c00b671015c00b98a3b0001";
 		var applicationJSON = {
 			"data":{
					"jobPostId":jobId,
					"applyWithResumeOrProfile":"Profile",
					"resume":null		
				}

 		}

 		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/applyToJobPost",applicationJSON).
 		then(function(res) {
 			if(res.status==200){
 				alert("Applied!");
 			}
 		}).catch(function(res) {
 			console.log(res);
 			vm.data.message = 'Something went wrong please try again: ' + res.data.result;
 			
		})
 	} 

 	vm.getInterestedJobPost = function() {

		$http.post("http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/fetchJobSeekerInterestedList",{}, {
    		headers: {'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
                'Accept': 'application/json'}
  		}).
 		then(function(res) {
 			if(res.status==200){
 				vm.interestedJobs = res.data.result;
 				filterInterestedJobs();
 				console.log(res.data.result);
 				//$state.go("jobSeekerHome");
 			}
 		}).catch(function(res) {
 			console.log(res);
 			if(res.status == 404){
 				vm.data.message ="No results found.";
 			}
 			else{
 				vm.data.message = 'Something went wrong please try again.';
 			}
 			
		})
	}


	vm.getCompanies();
	vm.getSearchResultsByFilter();

	

}

app.controller('JobSearchResultsController',JobSearchResultsControllerFn);
