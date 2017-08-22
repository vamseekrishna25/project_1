 angular.module("Myapp").controller("profile_con", ['$scope', '$timeout', '$http', '$rootScope', '$location', '$localStorage', 'Flash', '$window', 'angularLoad', '$filter', "moment", function ($scope, $timeout, $http, $rootScope, $location, $localStorage, Flash, $window, angularLoad, $filter, moment) {
        $scope.Logout = function () {
            $location.path('/login');
            $window.location.reload();
            $rootScope.loggedIn = false;
        };
        $scope.user_city = $rootScope.user_details.correspondenceAddress.city;
        $scope.user_lang = $filter('limitTo')($rootScope.config_details.language, 2);
        $scope.modules_data = $rootScope.user_capabilities.domains;
        $window.modules_data_to_mapjs = $scope.modules_data;
        $http.get('data/config.json').then(function (response) {
            $scope.places = response.data.regions;
            $scope.modulesData = response.data.modules;
            $scope.legend_value = $scope.modulesData[0].Name;
            $scope.lightData = response.data.lightIcons;
            $scope.parkingData = response.data.parkingIcons;
        });
        $scope.revtimef = $rootScope.config_details.time_format;
        $scope.timef = $filter('reverse')($scope.revtimef);
        $scope.state = false;
        $scope.chevron_off = function () {
            $scope.state = false;
        };
        $scope.chevron_on = function () {
            $scope.state = true;
        };
        $scope.arrow_state = false;
        $scope.arrow_off = function () {
            $scope.arrow_state = false;
        };
        $scope.arrow_on = function () {
            $scope.arrow_state = true;
        };
        $scope.date = new Date();
        $scope.tickInterval = 500; //ms
        var tick = function () {
            $scope.clock = Date.now(); // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        };
        // Start the timer
        $timeout(tick, $scope.tickInterval);
        $scope.time = function () {
            return $filter($scope.timef)($scope.clock);
        };
        $scope.date = function () {
            return moment.tz($scope.clock, $rootScope.config_details.unix_time_zone).format('DD-MM-YYYY');
        };
    }]);
