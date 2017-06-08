
var propertyManagement = angular.module('propertyManagementapp',[]);
propertyManagement.controller('propertyManagement', function($scope, $http, $window){

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


    $scope.sortName = 'firstName';
    $scope.sortReverse = false;
     $('select').select2();


     $scope.getAllServices = function(){
        console.log("The get all services API gets called");
        $http({
            method:'get',
            url:'/getAllServices'
        }).success(function(result){
            console.log("Getting all the services " + result.data);
            $scope.services=result.data;
        })

    }

    $scope.getAllModerators = function(){
        console.log("The get all moderators API gets called");
        $http({
            method:'get',
            url:'/getAllModerators'
        }).success(function(result){
            console.log("Getting all the moderators " + result.data);
            $scope.moderators=result.data;
        })
    }

    $scope.getCluster = function(id){
        console.log("getCluster gets called: "+id);
        $http({
            method:'post',
            url:'/getCluster',
            data:{
                "_id": id
            }
        }).success(function(result){
            console.log("Getting Cluster " + result.data);
            $scope.getClus= result.data;
        })
    };

     $scope.updateCluster = function(id){
        console.log("update Cluster gets called: "+id);
        var new_moderator = $("#new_moderator").val();
        var new_services_added = $("#new_clusterservices").val();
        $http({
            method:'post',
            url:'/updateCluster',
            data:{
                "_id": id,
                "new_cluster_name" : $scope.new_cluster_name,
                "new_services_added" : new_services_added,
                "new_moderator" : new_moderator
            }
        }).success(function(result){
            console.log("Updating Cluster " + result.data);
        })
    };

     $scope.removeCluster = function(id){
        console.log("remove Cluster gets called: "+id);
        
        $http({
            method:'post',
            url:'/removeCluster',
            data:{
                "_id": id,
            }
        }).success(function(result){
            console.log("Removing Cluster " + result.data);
        })
    };

/*
    $scope.getPendingProperty = function(id){
        $http({
            method:'post',
            url:'/getPendingProperty',
            data:{
                "_id":id
            }
        }).success(function(data){
            console.log("Getting getPending " + data);
            $scope.getPending=data;
        })
    };*/

});


propertyManagement.controller('clusterCreator', function($scope, $http, $window){

    $scope.createCluster = function () {
        console.log("The create service API gets called: ", $scope.cluster_name);
        
        var moderator = $("#moderator").val();
        console.log("Cluster moderator is", moderator);
        var clusterServices = $("#clusterservices").val();
        console.log("Cluster Services are: ", clusterServices);
        $http({
            method:'post',
            url:'/createClusterAdmin',
            params: {
                cluster_name: $scope.cluster_name,
                moderator: moderator,
                services: clusterServices
            }
        }).success(function(result){
            console.log("Success - Create cluster " + result.data);
            //$scope.services=result.data;
        })
    }


    $scope.getAllServices = function(){
        console.log("The get all services API gets called");
        $http({
            method:'get',
            url:'/getAllServices'
        }).success(function(result){
            console.log("Getting all the services " + result.data);
            $scope.services=result.data;
        })

    }

    $scope.getAllModerators = function(){
        console.log("The get all moderators API gets called");
        $http({
            method:'get',
            url:'/getAllModerators'
        }).success(function(result){
            console.log("Getting all the moderators " + result.data);
            $scope.moderators=result.data;
        })
    }

    $('select').select2();

});


