// Adding tile layer

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap
  };
  
 
// Link to GeoJSON
var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-" +
"a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";

var geojson;

// Grab data with d3
d3.json("geojson_NYCZip.geojson", function(Data) {
    console.log(Data);

    // Grab the data with d3
d3.json("temp.json", function(Cluster_Data) {
  console.log(Cluster_Data);
   
  // Create a new marker cluster group
  
  var markers = L.markerClusterGroup();


    for (var i = 0; i < Cluster_Data.length; i++) {

    // Set the data location property to a variable
    var Location = Cluster_Data[i].Location;
      // console.log(i);
      
    // Check for location property
    
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([Cluster_Data[i].Lat, Cluster_Data[i].Lng])
        .bindPopup(Cluster_Data[i].Zip.toString()));
                          
  }


  // Create a new choropleth layer  -  Income 
  geojson = L.choropleth(Data, {

    // Define what  property in the features to use
    valueProperty: "income",

    // Set color scale   - update collor   to red 
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 15,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.PO_NAME + ", " +'Pop_Size '+ feature.properties.pop + "<center>Median Household Income:<center>" +
      "$" + feature.properties.income);
  }
  });

  // Create a new choropleth layer -                          Population
  geojson_pop = L.choropleth(Data, {

    // Define what  property in the features to use
    valueProperty: "pop",

    // Set color scale   - update collor   to red 
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 5,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.PO_NAME + ", " +'Pop_Size '+ feature.properties.pop + "<center>Median Household Income:<center>" +
        "$" + feature.properties.income);
    }
  });
// keyvLUE AND MAP
  var overlayMaps = {
    Population_Density : geojson_pop,
    "Income": geojson, 
    "Cluster":markers
  };


  var map = L.map("map", {
    center: [40.6958, -73.9171],
    zoom: 11.49,
    layers: [lightmap, geojson]
  });

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

  // Set up the legend
  var legend = L.control({ position: "topleft" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>DENSITY</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(map);
  });
 });