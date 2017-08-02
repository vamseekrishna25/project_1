$("document").ready(function () {
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18
    , id: 'mapbox.streets'
    , accessToken: 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYSIsImEiOiJjajVueGwxZm4zdjh0MzJvOHh4bGh4c2gyIn0.zE6O3-3gjTLdjC7rJfsMpw'
}).addTo(mymap);
var marker=null;
var lat ,long;
$("#search").click(function (data) {
    var placeValue = $("#region_value").val();
    if(placeValue=="")
        {
            alert("Place Not Entered");
            placeValue=null;
        }
    $.getJSON('../data/places.json', function (data) {

var places_data = (data.regions);
        for(i=0;i<18;i++){
                if(places_data[i].Name == placeValue){
                    lat = places_data[i].Latitude;
                    long = places_data[i].Longitude;
                }
            }
        if(marker!=null)
            {
                mymap.removeLayer(marker);
            }
        mymap.setView([lat,long],11);
       marker = L.marker([lat,long]);
       marker.addTo(mymap);

    });

});



});
