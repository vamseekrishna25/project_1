angular.module("Myapp").controller("search_controller",['$scope','$rootScope','$http','$window',function($scope,$rootScope,$http,$window){

         var Search_bar = angular.element(document.querySelector('#region_value'));
     Search_bar.on('input', function () {
         $rootScope.mymap.removeLayer($rootScope.polygon);
         var placeValue = $(this).val();
         if (placeValue == "") {
             placeValue = null;
         }
         $.each($rootScope.places, function (index, value) {
             if (value.locationName == placeValue) {

                 $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.locations_url + value.locationId, $rootScope.config_ac).then(function (response) {
                     $scope.co_ordinates = response.data.polygon.coordinates;
                     $scope.poly_cod = [];
                     $window.query_cod = [];
                     $.each($scope.co_ordinates, function (index, value) {
                         var pointList = [value[1], value[0]];
                         var pointobject = {
                             latitude:value[1],
                             longitude:value[0]
                         };
                         $scope.poly_cod.push(pointList);
                         $window.query_cod.push(pointobject);

                     });
                      $rootScope.polygon = L.polygon([$scope.poly_cod]).addTo($rootScope.mymap);
                     $rootScope.mymap.setView([$scope.co_ordinates[0][1], $scope.co_ordinates[0][0]], 6);

                 });


             }
         });
     });

}]);
