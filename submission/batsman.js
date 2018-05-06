var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip1")
	.style("visibility", "hidden");

	var formatAsPercentage = d3.format(".2%");

d3.csv('data/batsmanruns.csv', function(error, data) {
	console.log(data);

	// set the dimensions and margins of the graph
	var margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 110
		},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// set the ranges
	var y = d3.scaleBand()
		.range([height, 0])
		.padding(0.1);

	var x = d3.scaleLinear()
		.range([0, width]);

	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var bar_bat = d3.select("#bat-bar").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	// format the data
	data.forEach(function(d) {
		d.runs = +d.runs;
	});

	// Scale the range of the data in the domains
	x.domain([0, d3.max(data, function(d) {
		return d.runs;
	})])
	y.domain(data.map(function(d) {
		return d.player;
	}));

	bar_bat.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("fill","#588ebb")
		.attr("width", function(d) {
			return x(d.runs);
		})
		.attr("y", function(d) {
			return y(d.player);
		})
		.attr("height", y.bandwidth())
		.on("click", display)
		.on("mouseover", function(d,i) {
			 d3.select(this)
				 .attr("fill", "#198f91");
	 })
	 .on("mouseout", function(d, i) {
		 d3.select(this)
			 .attr("fill", "#588ebb");
	 })
	 .append("title")
	 .text(function(d) { return "Total Runs: "+d.runs });

	function display(d) {
		console.log(d);
		var data_run = [{
				"run_type": "0 runs",
				"runs": +d[0] / d[-1]
			},
			{
				"run_type": "1 runs",
				"runs": +d[1] / d[-1]
			},
			{
				"run_type": "2 runs",
				"runs": +d[2] / d[-1]
			},
			{
				"run_type": "3 runs",
				"runs": +d[3] / d[-1]
			},
			{
				"run_type": "4 runs",
				"runs": +d[4] / d[-1]
			},
			{
				"run_type": "6 runs",
				"runs": +d[6] / d[-1]
			}
		];
		// console.log(data_run[0]["runs"]);
		// d3.select("#donut").datum(data_run).call(donut);
		$("#bat-donut").empty();
		dsDonutChart(data_run,d.player,d.runs);
	}
display(data[0]);
	function dsDonutChart(donutChartData,player,totalRuns) {

		var width = 400,
			height = 400,
			outerRadius = Math.min(width, height) / 2,
			innerRadius = outerRadius * .999,
			// for animation
			innerRadiusFinal = outerRadius * .5,
			innerRadiusFinal3 = outerRadius * .45,

			color = d3.scaleOrdinal()
				.domain(["0","1","2","3","4","5","6"])
				.range(["#ffe0e5","#c9e9fd","#D7D1F8","#c0e6eb","#A8CFFF","#ffffbf","#ffffbf"]);
			;

		var donut_bat = d3.select("#bat-donut")
			.append("svg:svg")
			.data(donutChartData)
			.attr("width", width)
			.attr("height", height)
			.append("svg:g")
			.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")
		;

		$("#bat-legend").empty();
		var legend_svg1 = d3.select("#bat-legend")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var legend1 = legend_svg1.selectAll(".runtype")
			.data(donutChartData)
			.enter().append("g")
			.attr("class", "runtype");
		console.log("here");
		var legendSpace = 200 / 7;

		legend1.append("rect")
			.attr("width", 20)
			.attr("height", 20)
			.attr("x", 10)
			.attr("y", function(d, i) {
				return (legendSpace) + i * (legendSpace) - 8;
			})
			.attr("fill", function(d, i) {
				select_color = color(d.run_type);
				console.log("Color is "+select_color);
				return color(d.run_type);
			})
			.attr("class", "legend-box");

		legend1.append("text")
			.attr("x", 35)
			.attr("y", function(d, i) {
				return (legendSpace) + i * (legendSpace) + 6;
			})
			.text(function(d, i) {
				console.log(d.run_type);
				return d.run_type;
			});

		var arc = d3.arc()
			.outerRadius(outerRadius).innerRadius(innerRadius);

		// for animation
		var arcFinal = d3.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
		var arcFinal3 = d3.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

		var pie = d3.pie()
			.value(function(d) {
				return d.runs;
			});

		var arcs = donut_bat.selectAll("g.slice")
			.data(pie(donutChartData))
			.enter()
			.append("svg:g")
			.attr("class", "slice")
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
		// .on("click", up)
		;

		arcs.append("svg:path")
			.attr("fill", function(d, i) {
				return color(i);
			})
			.attr("d", arc)
			// .on("mouseover", function(d) {
			// 	return tooltip.html(d.data.run_type + " : " + formatAsPercentage((d.data.runs).toFixed(3)))
			// 		.style("visibility", "visible")
			// 		.style("top", (event.pageY - 17) + "px").style("left", (event.pageX + 25) + "px");
			// })
			// .on("mouseout", function() {
			// 	return tooltip.style("visibility", "hidden");
			// })
			.append("title")
	 	 .text(function(d) { return d.data.run_type + " : " + formatAsPercentage((d.data.runs).toFixed(3)) });

		d3.selectAll("g.slice").selectAll("path").transition()
			.duration(750)
			.delay(10)
			.attr("d", arcFinal)
			.attr("data-legend", function(d) {
				return d.run_type
			});

		// Add a label to the larger arcs, translated to the arc centroid and rotated.
		// source: http://bl.ocks.org/1305337#index.html
		arcs.filter(function(d) {
				return d.endAngle - d.startAngle > .2;
			})
			.append("svg:text")
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")";
			});

		// Computes the label angle of an arc, converting from radians to degrees.
		function angle(d) {
			var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
			return a > 90 ? a - 180 : a;
		}

		// Pie chart title
		donut_bat.append("svg:text")
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.attr("font-weight", "bold")
			.style("font-size", "16px")
			.text(player)
			.attr("class", "title");

		donut_bat.append("svg:text")
			.attr("dy", "1.75em")
			.attr("text-anchor", "middle")
			.attr("font-weight", "bold")
			.style("font-size", "16px")
			.text(totalRuns+" runs")
			.attr("class", "title");

		function mouseover() {
			d3.select(this).select("path").transition()
				.duration(400)
				.attr("d", arcFinal3);
		}

		function mouseout() {
			d3.select(this).select("path").transition()
				.duration(400)
				.attr("d", arcFinal);
		}
	}

	// add the x Axis
	bar_bat.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	// add the y Axis
	bar_bat.append("g")
		.call(d3.axisLeft(y));
});
