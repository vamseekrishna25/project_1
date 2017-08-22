  angular.module("Myapp").filter('H42', ['moment', '$rootScope', function (moment, $rootScope) {
        return function (data) {
            return moment.tz(data, $rootScope.config_details.unix_time_zone).format('HH:mm');
        };
}]);
