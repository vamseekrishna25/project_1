$("document").ready(function () {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18
        , id: 'mapbox.streets'
        , accessToken: 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYSIsImEiOiJjajVueGwxZm4zdjh0MzJvOHh4bGh4c2gyIn0.zE6O3-3gjTLdjC7rJfsMpw'
    }).addTo(mymap);
    var marker = null;
    var lat, long;
    $("#region_value").on('input', function (data) {
        var placeValue = $(this).val();
        if (placeValue == "") {
            placeValue = null;
        }
        $.getJSON('../data/config.json', function (data) {
            var places_data = (data.regions);
            for (i = 0; i < 18; i++) {
                if (places_data[i].Name == placeValue) {
                    lat = places_data[i].Latitude;
                    long = places_data[i].Longitude;
                    if (marker != null) {
                        mymap.removeLayer(marker);
                    }
                    mymap.setView([lat, long], 11);
                    marker = L.marker([lat, long]);
                    marker.addTo(mymap);
                }
            }
        });
    });
    var ovcount = 0;
    $("#ob").click(function () {
        if (ovcount == 0) {
            $('#overviewPannel').css({
                'height': '200px'
                , 'transition': 'height 2s linear'
            });
            $(this).addClass("transup");
            ovcount++;
        }
        else if (ovcount % 2 == 0) {
             $('#overviewPannel').css({
                'height': '200px'
                , 'transition': 'height 2s linear'
            });
            $(this).removeClass('transdown').addClass('transup');
            ovcount++;
        }
        else if (ovcount % 2 != 0) {
             $('#overviewPannel').css({
                'height': '0px'
                , 'transition': 'height 2s linear'
            });

            $(this).removeClass('transup').addClass('transdown');
            ovcount++;


        }
    });
        var mbcount = 0;
    $("#mb").click(function () {
        if (mbcount == 0) {
            $('#Modules_tab').css({
                'width': '220px'

            });
            $(this).css({
                'transform':' translate(-205px,0px) rotate(90deg)'

            });
            mbcount++;
        }
        else if (mbcount % 2 == 0) {
             $('#Modules_tab').css({
                'width': '220px'

            });
            $(this).css({
                'transform':' translate(-205px,0px) rotate(90deg)'

            });
            mbcount++;
        }
        else if (mbcount % 2 != 0) {
             $('#Modules_tab').css({
               'width': '0px'

            });

           $(this).css({
                'transform':' translate(0px,0px) rotate(90deg)'
            });
            mbcount++;


        }
    });
   $("#Success").click(function(){
         if (!$(this).is(':checked')) {

        }


   });
    $( "#accordion" ).accordion({
        collapsible: true
    });


});
