function initGeolocation()
     {
        if( navigator.geolocation )
        {
           // Call getCurrentPosition with success and failure callbacks
           navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
           alert("Sorry, your browser does not support geolocation services.");
        }
     }

     function success(position)
     {

         document.getElementById('currentLong').value = position.coords.longitude;
         document.getElementById('currentLat').value = position.coords.latitude
     }

     function fail()
     {
        // Could not obtain location
     }


     // -----------------

//sample data values for populate map
var data = [
    {"loc":[41.575330,13.102411], "title":"aquamarine"},
    {"loc":[41.575730,13.002411], "title":"black"},
    {"loc":[41.807149,13.162994], "title":"blue"},
    {"loc":[41.507149,13.172994], "title":"chocolate"},
    {"loc":[41.847149,14.132994], "title":"coral"},
    {"loc":[41.219190,13.062145], "title":"cyan"},
    {"loc":[41.344190,13.242145], "title":"darkblue"},	
    {"loc":[41.679190,13.122145], "title":"darkred"},
    {"loc":[41.329190,13.192145], "title":"darkgray"},
    {"loc":[41.379290,13.122545], "title":"dodgerblue"},
    {"loc":[41.409190,13.362145], "title":"gray"},
    {"loc":[41.794008,12.583884], "title":"green"},	
    {"loc":[41.805008,12.982884], "title":"greenyellow"},
    {"loc":[41.536175,13.273590], "title":"red"},
    {"loc":[41.516175,13.373590], "title":"rosybrown"},
    {"loc":[41.506175,13.173590], "title":"royalblue"},
    {"loc":[41.836175,13.673590], "title":"salmon"},
    {"loc":[41.796175,13.570590], "title":"seagreen"},
    {"loc":[41.436175,13.573590], "title":"seashell"},
    {"loc":[41.336175,13.973590], "title":"silver"},
    {"loc":[41.236175,13.273590], "title":"skyblue"},
    {"loc":[41.546175,13.473590], "title":"yellow"},
    {"loc":[41.239190,13.032145], "title":"white"}
];



     // ----------------

     // initialize map
     var map = L.map("map", {zoom: 9, center: new L.latLng(data[0].loc) });
    //  var map = L.map("map").setView([38, 0], 2);
     L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
       attribution:
         '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
     }).addTo(map);

     var markersLayer = new L.LayerGroup();	//layer contain searched elements
     map.addLayer(markersLayer);
     
     function customTip(text,val) {
         return '<a href="#">'+text+'<em style="background:'+text+'; width:14px;height:14px;float:right"></em></a>';
     }
 
     map.addControl( new L.Control.Search({
		layer: markersLayer,
		buildTip: customTip,
		autoType: false
	}) );
 
     ////////////populate map with markers from sample data
     for(i in data) {
         var title = data[i].title,	//value searched
             loc = data[i].loc,		//position found
             marker = new L.Marker(new L.latLng(loc), {title: title} );//se property searched
         marker.bindPopup('title: '+ title );
         markersLayer.addLayer(marker);
     }
 

     var areaSelect = L.areaSelect({ width: 200, height: 250 });
     areaSelect.on("change", function () {
       var bounds = this.getBounds();
       $("#area .sw").val(
         bounds.getSouthWest().lat + ", " + bounds.getSouthWest().lng
       );
       $("#area .ne").val(
         bounds.getNorthEast().lat + ", " + bounds.getNorthEast().lng
       );
     });
     areaSelect.addTo(map);

     $("#remove").click(function () {
       areaSelect.remove();
     });

     $("#setDimensions").click(function () {
       areaSelect.setDimensions({
         width: $(".width").val(),
         height: $(".height").val(),
       });
     });

     var markers = []

     map.on('click', function(e) {
    markers.forEach(i=>  map.removeLayer(i))
    document.getElementById('destLong').value =  e.latlng.lng
    document.getElementById('destLat').value = e.latlng.lat
    markers.push( L.marker([e.latlng.lat,e.latlng.lng], {title: 'Destination' ,draggable:'true'}).addTo(map));
    console.log('MARKER::', markers[0]._leaflet_id)
    markers.forEach( i => i.on('dragend', function(event){
           
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))

    document.getElementById('destLong').value =  position.lat
         document.getElementById('destLat').value = position.lng

  }));
});