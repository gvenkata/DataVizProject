var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Creating an SVG wrapper, append an SVG group to hold the chart, shift SVG group by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Importing the csv file
d3.csv("nyc_gym_DF.csv")
  .then(function(projectData) {

    // Parse Data/Cast as numbers
   
    projectData.forEach(function(data) {
      data.est = +data.est;
      data.median_income = +data.median_income;
      data.population = +data.population;
      data.borough = +data.borough;
      data.white_pop = +data.white_pop;
      data.afr_am_pop = +data.afr_am_pop;	
      data.asian_pop= +data.afr_am_pop;
      data.nat_am_pacif_pop= +data.nat_am_pacif_pop;
      data.other_pop= +data.other_pop;	
      data.multi_race_pop = +data.multi_race_pop;
      data.white_pop_percent = +data.white_pop_percent;	
      data.afr_am_pop_percent = +data.afr_am_pop_percent;
      data.asian_pop_percent = +data.asian_pop_percent;
      data.nat_am_pacif_pop_percent	= +data.nat_am_pacif_pop_percent;
      data.other_pop_percent = +data.other_pop_percent;	
      data.multi_race_pop_percent =+data.other_pop_percent;

    });

    //Creating the scale functions
   
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(projectData, d => d.est)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(projectData, d => d.median_income)])
      .range([height, 0]);

    var zLinearScale = d3.scaleLinear()
      .domain([0, d3.max(projectData, d => d.population)]);
      //.range([height, 0]);


 
    // Creating the axis functions
  
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Appending the Axes to the chart
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Creating the Circles for Bubble Chart
  
    var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "aquamarine")
    .attr("stop-opacity", 0.15);

   gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "teal")
    .attr("stop-opacity", 1);






    var circlesGroup = chartGroup.selectAll("circle")
    .data(projectData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.est))
    .attr("cy", d => yLinearScale(d.median_income))
    .attr("r", d => zLinearScale(d.population*20))
    .attr("fill", "url(#gradient");
    //.attr("opacity", ".75");

    //Initializing tool tip
   
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([5, 80])
      .html(function(d) {
        return (`<b>Population:</b> ${d.population}<br><b>Median Income:</b> ${d.median_income}<br><b>Centers:</b> ${d.est}`);
      });

      var toolTip1 = d3.tip()
      .attr("class", "tooltip1")
      .offset([5, 80])
      .html(function(d) {
        return (`<u><b>Population:</b> ${d.population}</u><br><b>White:</b> ${d.white_pop} (${d.white_pop_percent}%)<br><b>African American:</b> ${d.afr_am_pop} (${d.afr_am_pop_percent}%)<br><b>Asian:</b> ${d.asian_pop} (${d.asian_pop_percent}%)<br><b>Native American/Pacific:</b> ${d.nat_am_pacif_pop} (${d.nat_am_pacif_pop_percent}%)<br><b>Multi-Race:</b> ${d.multi_race_pop} (${d.multi_race_pop_percent}%)<br><b>Other:</b> ${d.other_pop} (${d.other_pop_percent}%)`);
      });

    //Creating tooltip in the Bubble chart
  
    chartGroup.call(toolTip);
    chartGroup.call(toolTip1);

    //Creating Event Listeners to display/hide the tooltip
    
    circlesGroup.on("click", function(data) {
    toolTip.hide(data,this);
    toolTip1.show(data, this);

      })


    // Creating the mouseover event 
     circlesGroup.on("mouseover", function(data) {
      d3.select(this)
        .transition()
        .duration(0)
        .attr("r",d => zLinearScale(d.population*25))
        ;
        toolTip.show(data,this);
    })
      // Creating the onmouseout event
  
      circlesGroup.on("mouseout", function(data, index) {
         d3.select(this)
          .transition()
          .duration(100)
         .attr("r", d => zLinearScale(d.population*20))
         .attr("fill", "url(#gradient");
        toolTip.hide(data);
        toolTip1.hide(data);
      });

  

       
    // Creating axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Median Income");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Number of Fitness Establishments");
  });

 