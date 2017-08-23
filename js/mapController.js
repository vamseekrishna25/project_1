angular.module("Myapp").controller("map_controller",['$scope','$rootScope','$http',function($scope,$rootScope,$http){
    $('document').ready(function(){
        $rootScope.places = $rootScope.user_capabilities.locations.children[0].children;
     var query_data = angular.toJson($rootScope.urls_data.activeuser_query);
      $rootScope.mymap = L.map('mapid')
     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
         maxZoom: 18,
         id: 'mapbox.streets',
         accessToken: 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYSIsImEiOiJjajVueGwxZm4zdjh0MzJvOHh4bGh4c2gyIn0.zE6O3-3gjTLdjC7rJfsMpw'
     }).addTo($rootScope.mymap);
     $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.activeuser_url, query_data, $rootScope.config).then(function (response) {
         $rootScope.activeuser = response.data;
         $rootScope.config_ac = {
             headers: {
                 'Authorization': 'Bearer' + $rootScope.activeuser.http.token
             }
         };
         $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.locations_url + $rootScope.places[0].locationId, $rootScope.config_ac).then(function (response) {
             $scope.co_ordinates = response.data.polygon.coordinates;
             $scope.poly_cod = [];
             $.each($scope.co_ordinates, function (index, value) {
                 var pointList = [value[1], value[0]];
                 $scope.poly_cod.push(pointList);
             });
              $rootScope.polygon = L.polygon([$scope.poly_cod]).addTo($rootScope.mymap);
             $rootScope.mymap.setView([$scope.co_ordinates[0][1], $scope.co_ordinates[0][0]], 6);
         });
     });
    });

}]);
