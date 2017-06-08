var dashboard = angular.module('dashboardapp', ['nvd3']);
dashboard.controller('dashboard', function ($scope, $http) {


    $scope.totalClusters = function () {

        console.log("Call is coming for total clusters");
        $http({
            method: 'get',
            url: '/totalClusters'
        }).success(function (result) {
            console.log("Getting total clusters " + result.data);
            if (result.statusCode == 200) $scope.totalclusters = result.data;
            else $scope.totalclusters = "UNKNOWN ERROR OCCURED";
        });
    };

    $scope.totalServices = function () {

        console.log("Call is coming for total services");
        $http({
            method: 'get',
            url: '/totalServices'
        }).success(function (result) {
            console.log("Getting total services " + result.data);
            if (result.statusCode == 200) $scope.totalservices = result.data;
            else $scope.totalservices = "UNKNOWN ERROR OCCURED";
        });
    };


    $scope.cityRevenue = function () {

        $http({
            method: 'get',
            url: '/cityRevenue'

        }).success(function (result) {
            console.log("Getting top ten cities");
            $scope.cityRevenue = result;
            console.log($scope.cityRevenue);
            Highcharts.chart('container1', {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 0,
                        depth: 70
                    }
                },
                title: {
                    text: 'Cities with their revenue'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    title: {
                        text: 'City name'
                    },
                    categories: [result[0]._id, result[1]._id, result[2]._id, result[3]._id, result[4]._id, result[5]._id, result[6]._id]

                },
                yAxis: {
                    title: {
                        text: 'Revenue'
                    }
                },
                series: [{
                    name: 'Top 10 Cities',
                    colorByPoint: true,
                    data: [result[0].revenue, result[1].revenue, result[2].revenue, result[3].revenue, result[4].revenue, result[5].revenue, result[6].revenue]

                }]
            });

        })
    };


    $scope.topTenClusters = function () {

        /*$http({
            method: 'get',
            url: '/topTenClusters'

        }).success(function (result) {
            $scope.topTenClusters = result.data;
            console.log($scope.topTenClusters);

            Highcharts.chart('container2', {
                    chart: {
                        type: 'column',
                        options3d: {
                            enabled: true,
                            alpha: 10,
                            beta: 0,
                            depth: 70
                        }
                    },
                    title: {
                        text: 'Ten clusters with their user count'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Cluster name'
                        },
                        categories: [result.data.clusterName[0], result.data.clusterName[1], result.data.clusterName[2], result.data.clusterName[3], result.data.clusterName[4],
                        result.data.clusterName[5],result.data.clusterName[6], result.data.clusterName[7], result.data.clusterName[8],result.data.clusterName[9]]

                    },
                    yAxis: {
                        title: {
                            text: 'Count'
                        }
                    },
                    series: [{
                        name: 'Top 10 Clusters',
                        colorByPoint: true,
                        data: [result.data.count[0], result.data.count[1],result.data.count[2], result.data.count[3], result.data.count[4], result.data.count[5], result.data.count[6],
                        result.data.count[7], result.data.count[8], result.data.count[9]]

                    }]
                }
            );
        }).error(function (error) {
            console.log("error");
        })*/
    };


    $scope.totalUsers = function () {
        console.log("Call is coming for total users");

        $http({
            method: 'get',
            url: '/totalUsers'
        }).success(function (result) {
            console.log("Getting total users: " + result.data);
            if (result.statusCode == 200) $scope.totalusers = result.data;
            else $scope.totalusers = "UNKNOWN ERROR OCCURED";
        });
    };

    $scope.totalHosts = function () {
        console.log("Call is coming here");
        $http({
            method: 'get',
            url: '/totalHosts'
        }).success(function (data) {
            $scope.hosts = data;
        });
    };


    $scope.totalProperties = function () {
        console.log("Call is coming here");
        $http({
            method: 'get',
            url: '/totalProperties'
        }).success(function (data) {
            $scope.properties = data;
        });
    };


    $scope.totalRevenue = function () {
        console.log("Call is coming here");
        $http({
            method: 'get',
            url: '/totalRevenue'
        }).success(function (data) {
            $scope.revenue = data;
        });
    };
});