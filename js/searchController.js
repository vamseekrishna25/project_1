angular.module("Myapp").controller("search_controller", ['$scope', '$rootScope', '$http', '$window', '$timeout', function ($scope, $rootScope, $http, $window, $timeout) {

    var intial_search = 0;
    var Search_bar = angular.element(document.querySelector('#region_value'));
    var parking_query_array = [];
    var light_group_query_array = [];
    var light_zone_query_array = [];
    var parking_markers = [];
    var lighting_markers = [];
    var lighting_zone_markers = [];
    Search_bar.on('input', function () {

          var light_length = lighting_markers.length;
        for (i = 0; i < light_length; i++) {
            $rootScope.mymap.removeLayer(lighting_markers[i]);


        }
        var light_zone_length = lighting_zone_markers.length;
        for (i = 0; i < light_zone_length; i++) {
            $rootScope.mymap.removeLayer(lighting_zone_markers[i]);


        }
        parking_query_array = [];
    light_group_query_array = [];
     light_zone_query_array = [];
     parking_markers = [];
   lighting_markers = [];
 lighting_zone_markers = [];


        $rootScope.mymap.removeLayer($rootScope.polygon);
        var i;
        var light_length = $window.initial_lighting_markers.length;
        for (i = 0; i < light_length; i++) {
            $rootScope.mymap.removeLayer($window.initial_lighting_markers[i]);
        }
        var light_zone_length = $window.initial_lighting_zone_markers.length;
        for (i = 0; i < light_zone_length; i++) {

            $rootScope.mymap.removeLayer($window.initial_lighting_zone_markers[i]);

        }








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
                            latitude: value[1],
                            longitude: value[0]
                        };
                        $scope.poly_cod.push(pointList);
                        $window.query_cod.push(pointobject);
                    });
                    $rootScope.polygon = L.polygon([$scope.poly_cod]).addTo($rootScope.mymap);
                    $rootScope.mymap.setView([$scope.co_ordinates[0][1], $scope.co_ordinates[0][0]], 6);
                    var query_cod_string = JSON.stringify($window.query_cod);

                    parking_query_array.push(($rootScope.urls_data.devices_query_head + query_cod_string.toString().replace(/\"/g, '') + $rootScope.urls_data.parking_query));
                    light_group_query_array.push(($rootScope.urls_data.devices_query_head + query_cod_string.toString().replace(/\"/g, '') + $rootScope.urls_data.light_group_query));
                    light_zone_query_array.push(($rootScope.urls_data.devices_query_head + query_cod_string.toString().replace(/\"/g, '') + $rootScope.urls_data.light_zone_query));
                    var parking_query_object = angular.toJson(parking_query_array);
                    var light_group_query_object = angular.toJson(light_group_query_array);
                    var light_zone_query_object = angular.toJson(light_zone_query_array);
                    $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.devices_url, parking_query_object).then(function (response) {
                        $rootScope.parking_query_data = response.data;
                        $rootScope.parking_data = $rootScope.parking_query_data.Find.Result;
                        $scope.createParkingSpace = function () {
                            $.each($rootScope.parking_data, function (index, value) {
                                parking_markers[index] = L.marker([value.ParkingSpace.boundary.geoPoint[0].latitude, value.ParkingSpace.boundary.geoPoint[0].longitude], {
                                    myCustomId: "pm" + index,
                                    icon: $rootScope.parkingSpaceIcon
                                }).addTo($rootScope.mymap);
                            });
                        };
                        $scope.removeParkingSpace = function () {
                            var length = parking_markers.length;
                            var i;
                            for (i = 0; i < length; i++) {
                                $rootScope.mymap.removeLayer(parking_markers[i]);
                            }
                        };
                        $("#c1").click(function () {
                            if ($(this).is(':checked')) {
                                $scope.createParkingSpace();
                            } else {
                                $scope.removeParkingSpace();
                            }
                        });
                    });

                    $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.devices_url, light_group_query_object).then(function (response) {
                        $rootScope.lighting_query_data = response.data;
                        $rootScope.lighting_data = $rootScope.lighting_query_data.Find.Result;
                        $scope.createLighting = function () {
                            $.each($rootScope.lighting_data, function (index, value) {
                                lighting_markers[index] = L.marker([value.Light.geocoordinates.latitude, value.Light.geocoordinates.longitude], {
                                    myCustomId: "lm" + index,
                                    icon: $rootScope.LightingIcon,
                                    opacity: 0

                                }).addTo($rootScope.mymap);
                            });
                        };
                        $scope.removeLighting = function () {
                            var length = lighting_markers.length;
                            var i;
                            for (i = 0; i < length; i++) {
                                $rootScope.mymap.removeLayer(lighting_markers[i]);
                            }
                        };
                        if(intial_search == 0){
                                                  $("#c0").click(function () {
                            if ($(this).is(':checked')) {
                                $scope.createLighting();
                            } else {
                                $scope.removeLighting();
                            }
                        });

                        }

                    });

                    $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.devices_url, light_zone_query_object).then(function (response) {

                        $rootScope.lighting_zone_query_data = response.data;
                        $rootScope.lighting_zone_data = $rootScope.lighting_zone_query_data.Find.Result;
                        $scope.createLightingZone = function () {

                            $scope.removeLightingZone();
                            $.each($rootScope.lighting_zone_data, function (index, value) {
                                lighting_zone_markers[index] = L.marker([value.LightZone.boundary.geoPoint[0].latitude, value.LightZone.boundary.geoPoint[0].longitude], {
                                    myCustomId: "lzm" + index,
                                    icon: $rootScope.LightingZoneIcon
                                }).addTo($rootScope.mymap);

                                var on = true;


                                lighting_zone_markers[index].on('click', function (e) {

                                    if (on) {
                                        lighting_zone_markers[index].setIcon($rootScope.LightingZoneIconOn);
                                        on = !on;
                                    } else {
                                        lighting_zone_markers[index].setIcon($rootScope.LightingZoneIcon);
                                        on = !on;
                                    }

                                });



                                lighting_zone_markers[index].on('dblclick', function () {

                                    $rootScope.mymap.setView([value.LightZone.boundary.geoPoint[0].latitude, value.LightZone.boundary.geoPoint[0].longitude],18);
                                });
                            });
                        };
                        $scope.removeLightingZone = function () {
                            var length = lighting_zone_markers.length;
                            var i;
                            for (i = 0; i < length; i++) {
                                $rootScope.mymap.removeLayer(lighting_zone_markers[i]);
                            }
                        };

                        $("#c0").click(function () {
                            if ($(this).is(':checked')) {
                                $scope.createLightingZone();
                            } else {
                                $scope.removeLightingZone();
                            }
                        });




                    });

                    $rootScope.mymap.on('zoomend', function (ev) {
                        if ($rootScope.mymap.getZoom() > 15 && $rootScope.mymap.getZoom() <= 18) {
                            var i;
                            var light_length = lighting_markers.length;
                            for (i = 0; i < light_length; i++) {
                                lighting_markers[i].setOpacity(1);
                            }
                            var light_zone_length = lighting_zone_markers.length;
                            for (i = 0; i < light_zone_length; i++) {
                                lighting_zone_markers[i].setOpacity(0);
                            }
                        };
                        if ($rootScope.mymap.getZoom() >= 6 && $rootScope.mymap.getZoom() <= 15) {
                            var i;
                            var light_length = lighting_markers.length;
                            for (i = 0; i < light_length; i++) {
                                lighting_markers[i].setOpacity(0);
                            }
                            var light_zone_length = lighting_zone_markers.length;
                            for (i = 0; i < light_zone_length; i++) {
                                lighting_zone_markers[i].setOpacity(1);
                            }
                        };
                    });

                });
            }
        });
intial_search ++ ;
    });
}]);
