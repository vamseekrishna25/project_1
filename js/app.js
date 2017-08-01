(function () {
    
    var app = angular.module("Myapp", ['ngRoute']);
    
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/login_profile', {
            templateUrl: "templates/login_profile.html",
            controller: "profile_con"
        }).when('/login', {
            templateUrl: "templates/login.html"
        });
        $locationProvider.html5Mode(true);
    });
    app.controller("profile_con",function($scope,$timeout){
        
        $scope.date = new Date();
        $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
        
     
        
    });
})();