 angular.module("Myapp").filter('H21', ['moment', '$rootScope', function (moment, $rootScope) {
        return function (data) {
            return moment.tz(data, $rootScope.config_details.unix_time_zone).format('hh:mm A');
        };
}]);
