 angular.module("Myapp").controller("profile_con", ['$scope', '$timeout', '$http', '$rootScope', '$location',  'Flash', '$window', 'angularLoad', '$filter', "moment",'localStorageService', function ($scope, $timeout, $http, $rootScope, $location, Flash, $window, angularLoad, $filter, moment,localStorageService) {

     $scope.Logout = function () {
         angularLoad.loadCSS('css/style.css');
         $location.path('/login');
         $rootScope.loggedIn = false;
         localStorageService.set("loggedIn",false);

     };



     $scope.user_city = $rootScope.user_details.correspondenceAddress.city;
     $scope.user_lang = $filter('limitTo')($rootScope.config_details.language, 2);
     $scope.modules_data = $rootScope.user_capabilities.domains;
     $window.modules_data_to_mapjs = $scope.modules_data;
     $http.get('data/config.json').then(function (response) {
         $scope.modulesData = response.data.modules;
         $scope.legend_value = $scope.modulesData[0].Name;
         $scope.lightData = response.data.lightIcons;
         $scope.parkingData = response.data.parkingIcons;
     });

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

    }]);
