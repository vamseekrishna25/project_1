angular.module("Myapp").config(['$routeProvider','localStorageServiceProvider', function ($routeProvider,localStorageServiceProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login.html'
            , controller: 'loginCrlt'
            , resolve: {
                checklog: function (angularLoad, $rootScope, $location) {
                    if ($rootScope.loggedIn) {


                        $location.path('/login_profile');
                    }
                }
            }
        }).when('/login_profile', {
            templateUrl: 'login_profile.html'
            , controller: 'profile_con'
            , resolve: {
                loadscript: function (angularLoad, $rootScope) {

                    if ($rootScope.loggedIn) {


                        angularLoad.loadCSS('css/app.css');

                    }
                }
                , check: function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {

                        $location.path('/login');
                    }
                }
            , }
        }).otherwise({
            redirectTo: '/login'
        });
    localStorageServiceProvider
    .setPrefix('')
    .setNotify(true, true)
}]);
