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
d3.json("/static/data/nyc_gym_DF.json", function(Data) {
  console.log(Data);


  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
    // L.marker(40.852806,-73.912127).addTo(map);
    markers.addLayer(L.marker(40.852806,-73.912127)
           .bindPopup('Edwin'.descriptor));

             // Add our marker cluster layer to the map
  myMap.addLayer(markers);


});


//   // Loop through data
//   for (var i = 0; i < Data.length; i++) {

//     // Set the data location property to a variable
//     var Location = Data[i].Location;

//     // Check for location property
//     if (Location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([Location.coordinates[1], Location.coordinates[0]])
//         .bindPopup(Data[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);

// });
