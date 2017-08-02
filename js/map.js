        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18
            , id: 'mapbox.streets'
            , accessToken: 'pk.eyJ1IjoidmFtc2Vla3Jpc2huYSIsImEiOiJjajVueGwxZm4zdjh0MzJvOHh4bGh4c2gyIn0.zE6O3-3gjTLdjC7rJfsMpw'
        }).addTo(mymap);
        var marker = L.marker([51.5, -0.09]).addTo(mymap);
        marker.bindPopup("<b>heleo pudee</b><br><h1>kolo</h1>").openPopup();

        function onMapClick(e) {
            alert("You clicked the map at " + e.latlng);
        }
        mymap.on('click', onMapClick);
