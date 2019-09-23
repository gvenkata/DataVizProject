// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Assemble API query URL

// Grab the data with d3
d3.json("/static/data/temp.json", function(Data) {
  console.log(Data);
   
  // Create a new marker cluster group
  
  var markers = L.markerClusterGroup();


    for (var i = 0; i < Data.length; i++) {

    // Set the data location property to a variable
    var Location = Data[i].Location;
      console.log(i);
      
    // Check for location property
    
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([Data[i].Lat, Data[i].Lng])
        .bindPopup(Data[i].est.toString()));
                          
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
