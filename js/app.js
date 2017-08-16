(function () {
    var app = angular.module("Myapp", []);
    /*app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/login_profile', {
            templateUrl: "templates/login_profile.html",
            controller: "profile_con"
        }).when('/login', {
            templateUrl: "templates/login.html"
        });
        $locationProvider.html5Mode(true);
    });*/
    app.controller("profile_con", ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
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
