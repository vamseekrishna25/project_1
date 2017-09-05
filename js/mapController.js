angular.module("Myapp").controller("map_controller", ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $('document').ready(function () {
        $rootScope.places = $rootScope.user_capabilities.locations.children[0].children;
        var query_data = angular.toJson($rootScope.urls_data.activeuser_query);
        $rootScope.mymap = L.map('mapid')
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18
            , id: 'mapbox.streets'
            , accessToken: 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYSIsImEiOiJjajVueGwxZm4zdjh0MzJvOHh4bGh4c2gyIn0.zE6O3-3gjTLdjC7rJfsMpw'
        }).addTo($rootScope.mymap);
        $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.activeuser_url, query_data, $rootScope.config).then(function (response) {
            $rootScope.activeuser = response.data;
            $rootScope.config_ac = {
                headers: {
                    'Authorization': 'Bearer' + $rootScope.activeuser.http.token
                }
            };

            $window.query_cod = [];
            $http.get($rootScope.urls_data.base_url + $rootScope.urls_data.locations_url + $rootScope.places[0].locationId, $rootScope.config_ac).then(function (response) {

                $scope.co_ordinates = response.data.polygon.coordinates;
                $scope.poly_cod = [];
                $.each($scope.co_ordinates, function (index, value) {
                    var pointList = [value[1], value[0]];
                    $scope.poly_cod.push(pointList);
                    var pointobject = {
                        latitude: value[1]
                        , longitude: value[0]
                    };
                    $window.query_cod.push(pointobject);
                });
                $rootScope.polygon = L.polygon([$scope.poly_cod]).addTo($rootScope.mymap);
                $rootScope.mymap.setView([$scope.co_ordinates[0][1], $scope.co_ordinates[0][0]], 6);
                var query_cod_string = JSON.stringify($window.query_cod);
                var parking_query_array = [];
                var light_group_query_array = [];
                var light_zone_query_array = [];
                $window.parking_markers = [];
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
                            $window.parking_markers[index] = L.marker([value.ParkingSpace.boundary.geoPoint[0].latitude, value.ParkingSpace.boundary.geoPoint[0].longitude], {
                                myCustomId: "pm" + index
                                , icon: $rootScope.parkingSpaceIcon
                            }).addTo($rootScope.mymap);
                        });
                    };
                    $scope.removeParkingSpace = function () {
                        var length = $window.parking_markers.length;
                        var i;
                        for (i = 0; i < length; i++) {
                            $rootScope.mymap.removeLayer($window.parking_markers[i]);
                        }
                    };
                    $("#c1").click(function () {
                        if ($(this).is(':checked')) {
                            $scope.createParkingSpace();
                        }
                        else {
                            $scope.removeParkingSpace();
                        }
                    });
                });
                 $window.initial_lighting_zone_markers = [];
                $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.devices_url, light_zone_query_object).then(function (response) {
                    $rootScope.lighting_zone_query_data = response.data;
                    $rootScope.lighting_zone_data = $rootScope.lighting_zone_query_data.Find.Result;
                    $scope.createinitialLightingZone = function () {
                        $.each($rootScope.lighting_zone_data, function (index, value) {
                            $window.initial_lighting_zone_markers[index] = L.marker([value.LightZone.boundary.geoPoint[0].latitude, value.LightZone.boundary.geoPoint[0].longitude], {
                                myCustomId: "lzm" + index
                                , icon: $rootScope.LightingZoneIcon,
                                opacity:1
                            }).addTo($rootScope.mymap);
                            var on = true;
                            $window.initial_lighting_zone_markers[index].on('click', function (e) {
                                if (on) {
                                    $window.initial_lighting_zone_markers[index].setIcon($rootScope.LightingZoneIconOn);
                                    on = !on;
                                }
                                else {
                                    $window.initial_lighting_zone_markers[index].setIcon($rootScope.LightingZoneIcon);
                                    on = !on;
                                }
                            });
                              $window.initial_lighting_zone_markers[index].on('dblclick', function () {

                                    $rootScope.mymap.setView([value.LightZone.boundary.geoPoint[0].latitude, value.LightZone.boundary.geoPoint[0].longitude],18);
                                });
                        });
                    };
                    $scope.removeinitialLightingZone = function () {
                        var length = $window.initial_lighting_zone_markers.length;
                        var i;
                        for (i = 0; i < length; i++) {
                            $rootScope.mymap.removeLayer($window.initial_lighting_zone_markers[i]);
                        }
                    };

                    $("#c0").click(function () {
                        if ($(this).is(':checked')) {
                            $scope.createinitialLightingZone();
                        }
                        else {
                            $scope.removeinitialLightingZone();
                        }
                    });
                });
                $window.initial_lighting_markers = [];
                $http.post($rootScope.urls_data.base_url + $rootScope.urls_data.devices_url, light_group_query_object).then(function (response) {
                    $rootScope.lighting_query_data = response.data;
                    $rootScope.lighting_data = $rootScope.lighting_query_data.Find.Result;
                    $scope.createinitialLighting = function () {
                        $.each($rootScope.lighting_data, function (index, value) {
                            $window.initial_lighting_markers[index] = L.marker([value.Light.geocoordinates.latitude, value.Light.geocoordinates.longitude], {
                                myCustomId: "lm" + index
                                , icon: $rootScope.LightingIcon
                                , opacity: 0
                            }).addTo($rootScope.mymap);
                        });
                    };
                    $scope.removeinitialLighting = function () {
                        var length = $window.initial_lighting_markers.length;
                        var i;
                        for (i = 0; i < length; i++) {
                            $rootScope.mymap.removeLayer($window.initial_lighting_markers[i]);
                        }
                    };
                    $("#c0").click(function () {
                        if ($(this).is(':checked')) {
                            $scope.createinitialLighting();
                        }
                        else {
                            $scope.removeinitialLighting();
                        }
                    });
                });
                  setTimeout(function () {
            $rootScope.mymap.on('zoomend', function (ev) {
            if ($rootScope.mymap.getZoom() > 15 && $rootScope.mymap.getZoom() <= 18) {
                var i;
                var light_length = $window.initial_lighting_markers.length;
                for (i = 0; i < light_length; i++) {
                    $window.initial_lighting_markers[i].setOpacity(1);
                }
                var light_zone_length = $window.initial_lighting_zone_markers.length;
                for (i = 0; i < light_zone_length; i++) {
                    $window.initial_lighting_zone_markers[i].setOpacity(0);
                }
            };
            if ($rootScope.mymap.getZoom() >= 6 && $rootScope.mymap.getZoom() <= 15) {
                var i;
                var light_length = $window.initial_lighting_markers.length;
                for (i = 0; i < light_length; i++) {
                    $window.initial_lighting_markers[i].setOpacity(0);
                }
                var light_zone_length = $window.initial_lighting_zone_markers.length;
                for (i = 0; i < light_zone_length; i++) {
                    $window.initial_lighting_zone_markers[i].setOpacity(1);
                }
            };
        });
        }, 1000);

            });
        });
        $rootScope.parkingSpaceIcon = L.icon({
            iconUrl: '../images/parking/parking_cluster_icon.png'
        , });
        $rootScope.LightingIcon = L.icon({
            iconUrl: '../images/light/light_on_icon.png'
        , });
        $rootScope.LightingZoneIcon = L.icon({
            iconUrl: '../images/light/light_cluster_icon.png'
        , });
        $rootScope.LightingZoneIconOn = L.icon({
            iconUrl: '../images/light/light_cluster_icon_selected.png'
        , });
        $rootScope.LightingZoneIcon = L.icon({
            iconUrl: '../images/light/light_cluster_icon.png'
        , });


    });
}]);
