var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 30,
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
      data.n_code =+data.n_code;
      data.borough_code = +data.borough_code;
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
  
    var gradient1 = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient1")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient1.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "aquamarine")
    .attr("stop-opacity", 0.15);

   gradient1.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "teal")
    .attr("stop-opacity", 1);

    var gradient2 = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient2")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient2.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "pink")
    .attr("stop-opacity", 0.5);

   gradient2.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "red")
    .attr("stop-opacity", 1);

    var gradient3 = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient3")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient3.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "lightblue")
    .attr("stop-opacity", 0.25);

   gradient3.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "indigo")
    .attr("stop-opacity", 1);

    var gradient4 = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient4")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient4.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 0.5);

   gradient4.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 1);

  var gradient5 = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient5")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient5.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "lightblue")
    .attr("stop-opacity", 0.15);

   gradient5.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "blue")
    .attr("stop-opacity", 1);



    var circlesGroup = chartGroup.selectAll("circle")
    .data(projectData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.est))
    .attr("cy", d => yLinearScale(d.median_income))
    .attr("r", d => zLinearScale(d.population*30))
    .style("fill", function(d) {
      if (d.n_code == 53){return "url(#gradient5)"} 
      else {return "none"};})
    


    //Initializing tool tip
   
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, 120])
      .html(function(d) {
        return (`<b>Population:</b> ${d.population}<br><b>Median Income:</b> ${d.median_income}<br><b>Centers:</b> ${d.est}`);
      });

      var toolTip1 = d3.tip()
      .attr("class", "tooltip1")
      .offset([80, 120])
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
        .attr("r",d => zLinearScale(d.population*50))
        ;
        toolTip.show(data,this);
    })
      // Creating the onmouseout event
  
      circlesGroup.on("mouseout", function(data, index) {
         d3.select(this)
          .transition()
          .duration(100)
         .attr("r", d => zLinearScale(d.population*30))
        toolTip.hide(data);
        toolTip1.hide(data);
      });

  

       
    // Creating axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 15)
      .attr("x", 0 - (height / 2.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Median Income");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Number of Fitness Centers");

    chartGroup.append("text")
      .attr("transform", `translate(${width /2.5 }, ${height - 400})`)
      .attr("class","BoroughText")
      .text("Staten Island : South Shore")

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height - 427})`)
      .attr("class", "titleText")
      .text("Number of Fitness Centers vs. Median Income & Population")
  });






  (function($) {

    $.fn.menumaker = function(options) {
        
        var cssmenu = $(this), settings = $.extend({
          title: "Menu",
          format: "dropdown",
          sticky: false
        }, options);
  
        return this.each(function() {
          cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });
  
          cssmenu.find('li ul').parent().addClass('has-sub');
  
          multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };
  
          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
  
          if (settings.sticky === true) cssmenu.css('position', 'fixed');
  
          resizeFix = function() {
            if ($( window ).width() > 768) {
              cssmenu.find('ul').show();
            }
  
            if ($(window).width() <= 768) {
              cssmenu.find('ul').hide().removeClass('open');
            }
          };
          resizeFix();
          return $(window).on('resize', resizeFix);
  
        });
    };
  })(jQuery);
  
  (function($){
  $(document).ready(function(){
  
  $("#cssmenu").menumaker({
     title: "Menu",
     format: "multitoggle"
  });
  
  
  });
  })(jQuery);