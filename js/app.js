(function () {
    
    var app = angular.module("Myapp",[]);
    
    /*app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/login_profile', {
            templateUrl: "templates/login_profile.html",
            controller: "profile_con"
        }).when('/login', {
            templateUrl: "templates/login.html"
        });
        $locationProvider.html5Mode(true);
    });*/
    app.controller("profile_con",['$scope','$timeout','$http', function($scope,$timeout,$http){


        $http.get('data/places.json').then(function(response){
            $scope.places = response.data.regions;
        });
        
        $scope.date = new Date();
        $scope.tickInterval = 1000; //ms

    var tick = function() {
        $scope.clock = Date.now() ;// get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    // Start the timer
    $timeout(tick, $scope.tickInterval);
        
     
        
    }]);
})();
