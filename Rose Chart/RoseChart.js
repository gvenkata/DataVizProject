var trace1 = {
    r: [77.5, 72.5, 70.0, 45.0, 22.5, 42.5, 40.0, 62.5],
    t: ['North', 'N-E', 'East', 'S-E', 'South', 'S-W', 'West', 'N-W'],
    name: '11-14 m/s',
    marker: {color: 'rgb(106,81,163)'},
    type: 'barpolar'
  };
  
  var trace2 = {
    r: [57.5, 50.0, 45.0, 35.0, 20.0, 22.5, 37.5, 55.0],
    t: ['North', 'N-E', 'East', 'S-E', 'South', 'S-W', 'West', 'N-W'],
    name: '8-11 m/s',
    marker: {color: 'rgb(158,154,200)'},
    type: 'barpolar'
  };
  
  var trace3 = {
    r: [40.0, 30.0, 30.0, 35.0, 7.5, 7.5, 32.5, 40.0],
    t: ['North', 'N-E', 'East', 'S-E', 'South', 'S-W', 'West', 'N-W'],
    name: '5-8 m/s',
    marker: {color: 'rgb(203,201,226)'},
    type: 'barpolar'
  };
  
  var trace4 = {
    r: [20.0, 7.5, 15.0, 22.5, 2.5, 2.5, 12.5, 22.5],
    t: ['North', 'N-E', 'East', 'S-E', 'South', 'S-W', 'West', 'N-W'],
    name: '&lt; 5 m/s',
    marker: {color: 'rgb(242,240,247)'},
    type: 'barpolar'
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Wind Speed Distribution in Laurel, NE',
    font: {size: 16},
    legend: {font: {size: 16}},
    radialaxis: {ticksuffix: '%'},
    orientation: 270
  };
  
  Plotly.newPlot('myDiv', data, layout);