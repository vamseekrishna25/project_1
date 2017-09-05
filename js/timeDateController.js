angular.module("Myapp").controller("timedate_controller",['$scope','$rootScope','moment','$filter','$timeout',function($scope,$rootScope,moment,$filter,$timeout){

    $('document').ready(function(){

        $scope.revtimef = $rootScope.config_details.time_format;
     $scope.timef = $filter('reverse')($scope.revtimef);
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
    });

}]);
