var serviceManagement = angular.module('serviceManagementapp',[]);
serviceManagement.controller('serviceManagement', function($scope, $http, $window){

    $scope.getAllServices = function(){
        console.log("The cluster list gets called");
        $http({
            method:'get',
            url:'/getAllServices'
        }).success(function(result){
            console.log("Getting all the services " + result.data);
            $scope.services=result.data;
        })

    }


     $scope.getService = function(id){
        console.log("getService gets called: "+id);
        $http({
            method:'post',
            url:'/getService',
            data:{
                "_id": id
            }
        }).success(function(result){
            console.log("Getting Service " + result.data);
            $scope.getService= result.data;
        })
    };

    $scope.updateService = function(id){
        console.log("updateService gets called: "+id);
        $http({
            method:'post',
            url:'/updateService',
            data:{
                "_id": id,
                "new_service_name" : $scope.new_service_name,
                "new_description" : $scope.new_service_desc
            }
        }).success(function(result){
            console.log("Updating Service " + result.data);
            //$scope.getService= result.data;
        })
    };

     $scope.removeService = function(id){
        console.log("removeService gets called: "+id);
        $http({
            method:'post',
            url:'/removeService',
            data:{
                "_id": id,
            }
        }).success(function(result){
            console.log("Removing Service " + result.data);
            //$scope.getService= result.data;
        })
    };
    

});


serviceManagement.controller('serviceCreator', function($scope, $http, $window){

    $scope.createService = function () {
        console.log("The create service API gets called: ", $scope.service_name, $scope.service_desc);
        console.log("Service owner is", $("#owner").val());
        var service_owner = $("#owner").val();
        var clusters = $("#clustersAdded").val();

        console.log("Clusters added are", clusters);
        $http({
            method:'post',
            url:'/createService',
            params: {
                service_name: $scope.service_name,
                service_desc: $scope.service_desc,
                service_owner: service_owner,
                clusters: clusters
            }
        }).success(function(result){
            console.log("Created new service: " + result.data);
            alert("Service Created Successfully");
            $window.location.assign("/admin_serviceMgmt");
            //$scope.services=result.data;
        }).error(function (err) {
            console.log(err);
            $window.location.assign("/admin_createService");
        })
        alert("Service Created Successfully");
    }

     $scope.getAllServiceOwners = function(){
        console.log("The get all service owners API gets called in angular");
        $http({
            method:'get',
            url:'/getAllServiceOwners'
        }).success(function(result){
            console.log("SUCCESS - Getting all the service owners " + result.data);
            $scope.serviceowners=result.data;
        }).error(function (data) {
            console.log("FAILED - Getting all the service owners");
                console.log(data);
        });
    }


     $scope.getAllClusters = function(){
        console.log("The cluster list gets called");
        $http({
            method:'get',
            url:'/getAllClusters'
        }).success(function(result){
            console.log("Getting all the clusters " + result.data);
            $scope.clusters=result.data;
        })

    }


    $('select').select2();


});

