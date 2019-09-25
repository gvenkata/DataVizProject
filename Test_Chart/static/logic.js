		
			var rose = Chart.rose(),
				height = 600,
				format = d3.time.format('%m/%Y'),
				causes = ['disease', 'wounds', 'other'],
				labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			// Add a title:
			d3.select('body').append('h2')
				.attr('class', 'title')
				.html( 'Diagram <span class="small">of the</span> Causes <span class="small">of</span> Mortality <span class="small">in the</span> Army <span class="small">of the</span> East');

			// Add sub-titles:
			d3.select('body').append('h3')
				.attr('class', 'subtitle left')
				.html('April 1855 - March 1856');

			d3.select('body').append('h3')
				.attr('class', 'subtitle right')
				.html('April 1854 - March 1855');

			// Load the JSON data:
			d3.json( 'data.json', function( data ) {
				// Data from: http://ocp.hul.harvard.edu/dl/contagion/010164675

				// Format the date and rework the data:
				var scalar;
				data.forEach( function(d) { 
					d.date = format.parse(d.date);
					d.label = labels[d.date.getMonth()];
					
					// Calculate the average annual mortality, as done by Nightingale:
					// http://understandinguncertainty.org/node/214 
					scalar = 1000*12 / d.army_size;
					d.disease = d.disease * scalar;
					d.wounds  = d.wounds  * scalar;
					d.other   = d.other   * scalar;
				} );

				// Get the maximum value:
				var maxVal = d3.max( data, function(d) {
					return d3.max( [d.disease, d.wounds, d.other] );
				});

				// Where the maximum value gives us the maximum radius:
				var maxRadius = Math.sqrt(maxVal*12 / Math.PI);

				// Divide the dataset in two:
				var dataset2 = data.slice(12,24),
					dataset1 = data.slice(0,12);
				
				// Append a new figure to the DOM:
				figure = d3.select( 'body' )
					.append( 'figure' );

				// Get the figure width:
				width = parseInt( figure.style( 'width' ), 10 );

				// Update the chart generator settings:
				rose.legend( causes )
					.width( width )
					.height( height )
					.delay( 0 )
					.duration( 500 )
					.domain( [0, maxRadius] )
					.angle( function(d) { return d.date.getMonth(); } )
					.area( function(d, i) { return [d.disease, d.wounds, d.other]; } );							

				// Bind the data and generate a new chart:
				figure.datum( dataset1 )
					.attr('class', 'chart figure1')
					.call( rose );	

				// Append a new figure to the DOM:
				figure = d3.select( 'body' )
					.append( 'figure' );

				// Get the figure width:
				width = parseInt( figure.style( 'width' ), 10 );

				// Update the chart generator settings:
				rose.width( width )
					.delay( 3000 );

				// Bind the second dataset and generate a new chart:
				figure.datum( dataset2 )
					.attr('class', 'chart figure2')
					.call( rose );	

				// Append a caption:
				d3.select('.figure2').append('figcaption')
					.attr('class', 'caption')
					.html('The Areas of the blue, red, &amp; black wedges are each measured from the centre as the common vertex <p> The blue wedges measured from the centre of the circle represent area for area the deaths from Preventible or Mitigable Zymotic Diseases, the red wedges measured from the center the deaths from wounds, &amp; the black wedges measured from the center the deaths from all other causes </p><p> In October 1844, &amp; April 1855, the black area coincides with the red, in January &amp; February 1856, the blue coincides with the black </p><p> The entire areas may be compared by following the blue, the red &amp; the black lines enclosing them.</p>');

				// Create a legend:
				Chart.legend( causes );

				// Create a slider:
				Chart.slider( 0, data.length, 1 ); // minVal, maxVal, step
				
			});	
