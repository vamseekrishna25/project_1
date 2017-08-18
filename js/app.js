(function () {
    var app = angular.module("Myapp", ['ngRoute', 'ngStorage', 'ngFlash', 'angularLoad']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCrlt',
            resolve: {
                checklog: function (angularLoad, $rootScope, $location) {
                    if ($rootScope.loggedIn) {
                        $location.path('/login_profile');
                    }
                }
            }
        }).when('/login_profile', {
            templateUrl: 'login_profile.html',
            controller: 'profile_con',
            resolve: {
                loadscript: function (angularLoad, $rootScope) {
                    if ($rootScope.loggedIn) {
                        angularLoad.loadCSS('css/app.css');
                        angularLoad.loadScript('js/map.js');
                    }
                },
                check: function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/login');
                    }
                },
            }
        }).otherwise({
            redirectTo: '/login'
        });
}]);
    app.controller("loginCrlt", ['$scope', '$location', '$route', '$rootScope', '$http', '$window', function ($scope, $location, $route, $rootScope, $http, $window) {
        $scope.submit = function () {
            if ($scope.username == "operator@paris.com" && $scope.password == "Test@123") {
                var data = {
                    "username": "operator@paris.com",
                    "password": "Test@123"
                };
                $http.get("http://52.221.32.110:9000/api/v1/Customers/findOne?filter=%7B%22where%22:%7B%22name%22:%22paris.com%22%7D%7D").then(function (response) {
                    $rootScope.config_details = response.data;
                    $http.post("http://52.221.32.110:9000/api/v1/accounts/cdptoken?domain=paris.com", data).then(function (response) {
                        $rootScope.tokenAPI_data = response.data;
                        var config = {
                            headers: {
                                'Authorization': 'Bearer' + $rootScope.tokenAPI_data
                            }
                        };
                        $http.get("http://52.221.32.110:9000/t/paris.com/cdp/v1/accounts/userdetails?loginName=operator", config).then(function (response) {
                            $rootScope.user_details = response.data;
                            $http.get("http://52.221.32.110:9000/t/paris.com/cdp/v1/capabilities/customer/00a3da65-8c9b-4eb1-b1d9-2ede872896af", config).then(function (reponse) {
                                $rootScope.user_capabilities = reponse.data;
                                $rootScope.loggedIn = true;
                                $location.path('/login_profile');
                            }, function (response) {
                                $location.path('/login');
                            });


                        }, function (response) {
                            $location.path('/login');
                        });

                    }, function (response) {
                        $location.path('/login');
                    });
                }, function (response) {
                    $location.path('/login');
                });
            }
        };
    }]);
    app.controller("profile_con", ['$scope', '$timeout', '$http', '$rootScope', '$location', '$localStorage', 'Flash', '$window', 'angularLoad', function ($scope, $timeout, $http, $rootScope, $location, $localStorage, Flash, $window, angularLoad) {
        $scope.Logout = function () {
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
