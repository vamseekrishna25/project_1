 angular.module("Myapp").controller("loginCrlt", ['$scope', '$location', '$route', '$rootScope', '$http', '$window', function ($scope, $location, $route, $rootScope, $http, $window) {
        $scope.submit = function () {
            if ($scope.username == "operator@paris.com" && $scope.password == "Test@123") {
                var data = {
                    "username": "operator@paris.com"
                    , "password": "Test@123"
                };
                $http.get("data/urls.json").then(function(response){
                    $scope.urls_data = response.data;


                $http.get($scope.urls_data.config_url).then(function (response) {
                    $rootScope.config_details = response.data;
                    $http.post($scope.urls_data.token_url, data).then(function (response) {
                        $rootScope.tokenAPI_data = response.data;
                        var config = {
                            headers: {
                                'Authorization': 'Bearer' + $rootScope.tokenAPI_data
                            }
                        };
                        $http.get($scope.urls_data.userdetails_url, config).then(function (response) {
                            $rootScope.user_details = response.data;
                            $http.get($scope.urls_data.customer_url, config).then(function (reponse) {
                                $rootScope.user_capabilities = reponse.data;
                                $location.path('/login_profile');
                                $rootScope.loggedIn = true;
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
                    });
            }
        };
    }]);
