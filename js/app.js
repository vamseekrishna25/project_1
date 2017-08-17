(function () {
    var app = angular.module("Myapp", ['ngRoute','ngStorage','ngFlash','angularLoad']);
    app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
            controller:'loginCrlt'
        })
         .when('/login_profile', {
            templateUrl: 'login_profile.html',
            controller:'profile_con',

        resolve: {
            loadscript:function(angularLoad,$rootScope){
                if($rootScope.loggedIn)
                angularLoad.loadScript('js/map.js');
            },

            check:function($location,$rootScope){
                if(!$rootScope.loggedIn){
                    $location.path('/login');

                }
            },

              }



        })

        .otherwise({ redirectTo: '/login' });

}]);
    app.controller("loginCrlt",['$scope','$location','$route','$rootScope',function($scope,$location,$route,$rootScope){
        $scope.submit = function(){

            if($scope.username == "admin" && $scope.password == "admin" )
                $rootScope.loggedIn = true;
                $location.path('/login_profile');


        };


    }]);

    app.controller("profile_con", ['$scope', '$timeout', '$http', '$rootScope','$location','$localStorage','Flash' ,'$window',function ($scope, $timeout, $http,$rootScope,$location,$localStorage,Flash,$window) {
        $scope.Logout = function(){
            $location.path('/login');
            $window.location.reload();
            $rootScope.loggedIn = false;
            };

        $http.get('data/config.json').then(function (response) {

            $scope.places = response.data.regions;
            $scope.Format = response.data.format;
            $scope.timef = $scope.Format[0].timeformat;
            $scope.datef = $scope.Format[0].dateformat;
            $scope.modulesData = response.data.modules;
            $scope.legend_value = $scope.modulesData[0].Name;
            $scope.lightData = response.data.lightIcons;
            $scope.parkingData = response.data.parkingIcons;
        });

            /*var menu_dropdown = angular.element(document.querySelector('#list'));
            var dis = menu_dropdown.css('display');*/
            $scope.state = false;
            $scope.chevron_off = function () {
                $scope.state = false;
            };
            $scope.chevron_on = function () {
                29
                $scope.state = true;
            };

        $scope.date = new Date();
        $scope.tickInterval = 1000; //ms
        var tick = function () {
            $scope.clock = Date.now(); // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        };
        // Start the timer
        $timeout(tick, $scope.tickInterval);
    }]);
})();
