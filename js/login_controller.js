 angular.module("Myapp").controller("loginCrlt", ['$scope', '$location', '$route', '$rootScope', '$http', '$window','localStorageService','Flash', function ($scope, $location, $route, $rootScope, $http, $window,localStorageService,Flash) {
Flash.clear();
     $scope.submit = function () {
      Flash.clear();
         if ($scope.username == "operator@paris.com" && $scope.password == "Test@123") {
             Flash.create('success', 'Login Success Rediredcting...', 0, {container: 'flash-fixed'});
             $http.get("data/urls.json").then(function (response) {
                 $rootScope.urls_data = response.data;
                 $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.config_url).then(function (response) {
                     $rootScope.config_details = response.data;
                     var token_data = angular.toJson($rootScope.urls_data.token_query);
                     $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.token_url, token_data).then(function (response) {
                         $rootScope.tokenAPI_data = response.data;
                          $rootScope.config = {
                             headers: {
                                 'Authorization': 'Bearer' + $rootScope.tokenAPI_data
                             }
                         };
                         $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.userdetails_url, $rootScope.config).then(function (response) {
                             $rootScope.user_details = response.data;
                             $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.customer_url + $rootScope.user_details.id, $rootScope.config).then(function (reponse) {
                                 $rootScope.user_capabilities = reponse.data;
                                 $location.path('/login_profile');
                                 $rootScope.loggedIn = true;
                                 localStorageService.set("loggedIn",true);




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
         else{
             Flash.create('danger', 'Invalid Credentials!', 0, {container: 'flash-fixed'});
         }
     };
    }]);
