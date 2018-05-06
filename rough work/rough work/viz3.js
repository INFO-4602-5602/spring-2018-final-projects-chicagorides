var margin3 = {top: 50, right: 20, bottom: 50, left:50};
var width3 = 1100 - margin3.left - margin3.right;
var height3 = 300 - margin3.top - margin3.bottom;


// set the ranges
// var x = d3.scaleLinear().range([0,width]);
// var y = d3.scaleLinear().range([height,0]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin3
var svg4s = d3.select("#foursperover").append("svg")
          .attr("width", width3 + margin3.left + margin3.right)
          .attr("height", height3 + margin3.top + margin3.bottom)
          // .append("g")
          // .attr("transform","translate(" + margin3.left + "," + margin3.top + ")");

var formatValue = d3.format(",d");

var x = d3.scaleLinear().rangeRound([0, width3]);

var g = svg4s.append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

d3.csv("perteam4s.csv", type4, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.over; }));

  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x(d.over); }).strength(1))
      .force("y", d3.forceY(height3/2))
      .force("collide", d3.forceCollide(10))
      .stop();

  for (var i = 0; i < 120; ++i) simulation.tick();

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x).ticks(20, ".0s"));

  var cell = g.append("g")
      .attr("class", "cells")
    .selectAll("g").data(d3.voronoi()
        .extent([[-margin3.left, -margin3.top], [width3 + margin3.right, height3 + margin3.top]])
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      .polygons(data)).enter().append("g");

  cell.append("circle")
      .attr("r", function(d){ return formatValue(d.data.fours/20);})
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; })
      .attr("fill", function(d)
      {
        console.log(d.data.batting_team);
        return colors_fetch(d.data.batting_team);
      });

  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  cell.append("title")
      .text(function(d) { return formatValue(d.data.fours) + "\n" + formatValue(d.data.over); });
});

var svg6s = d3.select("#sixesperover").append("svg")
          .attr("width", width3 + margin3.left + margin3.right)
          .attr("height", height3 + margin3.top + margin3.bottom)
          // .append("g")
          // .attr("transform","translate(" + margin3.left + "," + margin3.top + ")");


var x2 = d3.scaleLinear()
    .rangeRound([0, width3]);

var g6 = svg6s.append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

d3.csv("perteam6s.csv", type6, function(error, data) {
  if (error) throw error;

  x2.domain(d3.extent(data, function(d) { return d.over; }));

  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x2(d.over); }).strength(1))
      .force("y", d3.forceY(height3/2))
      .force("collide", d3.forceCollide(10))
      .stop();

  for (var i = 0; i < 120; ++i) simulation.tick();

  g6.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x2).ticks(20, ".0s"));

  var cell = g6.append("g")
      .attr("class", "cells")
    .selectAll("g").data(d3.voronoi()
        .extent([[-margin3.left, -margin3.top], [width3 + margin3.right, height3 + margin3.top]])
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      .polygons(data)).enter().append("g");

  cell.append("circle")
      .attr("r", function(d){ return formatValue(d.data.sixes/10);})
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; })
      .attr("fill", function(d)
      {
        console.log(d.data.batting_team);
        return colors_fetch(d.data.batting_team);
      });

  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  cell.append("title")
      .text(function(d) { return formatValue(d.data.sixes) + "\n" + formatValue(d.data.over); });
});


function type4(d) {
  if (!d.over) return;
  d.over = +d.over;
  if(!d.fours) return;
  d.fours = +d.fours;
  return d;
}
function type6(d) {
  if (!d.over) return;
  d.over = +d.over;
  if(!d.sixes) return;
  d.sixes = +d.sixes;
  return d;
}
function colors_fetch(n) {
  var team_colors_3 = {
    "Chennai Super Kings":"#ffff3c",
    "Deccan Chargers":"#ff9933",
    "Delhi Daredevils":"#cc0000",
    "Gujarat Lions":"#ffb266",
    "Kings XI Punjab":"#ff9999",
    "Kochi Tuskers Kerala":"#b266ff",
    "Kolkata Knight Riders":"#7f00ff",
    "Mumbai Indians":"#0080ff",
    "Pune Warriors":"#ff99cc",
    "Rajasthan Royals":"#0000ff",
    "Rising Pune Supergiants":"#cc99ff",
    "Royal Challengers Bangalore":"#ff3333",
    "Sunrisers Hyderabad":"#ff8000",
  }
  return team_colors_3[n];
}
var data_team = [{
    "team": "Chennai Super Kings",
  },
  {
    "team": "Deccan Chargers",
  },
  {
    "team": "Delhi Daredevils",
  },
  {
    "team": "Gujarat Lions",
  },
  {
    "team": "Kings XI Punjab",
  },
  {
    "team": "Kochi Tuskers Kerala",
  },
  {
    "team": "Kolkata Knight Riders",
  },
  {
    "team": "Mumbai Indians",
  },
  {
    "team": "Pune Warriors",
  },
  {
    "team": "Rajasthan Royals",
  },
  {
    "team": "Rising Pune Supergiants",
  },
  {
    "team": "Royal Challengers Bangalore",
  },
  {
    "team": "Sunrisers Hyderabad",
  }
];
widthl = 280;
heightl = 700;
var legend_svg3 = d3.select("#scores-legend")
  .append("svg")
  .attr("width", widthl)
  .attr("height", heightl)
  .append("g")
  .attr("transform", "translate(" + margin3.left + "," + 100 + ")");

var legend3 = legend_svg3.selectAll(".team")
  .data(data_team)
  .enter().append("g")
  .attr("class", "team");

var legendSpace3 = 200 / 7;

legend3.append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("x", 10)
  .attr("y", function(d, i) {
    return (legendSpace3) + i * (legendSpace3) - 8;
  })
  .attr("fill", function(d, i) {
    select_color = colors_fetch(d.team);
    return select_color;
  })
  .attr("class", "legend-box");

legend3.append("text")
  .attr("x", 35)
  .attr("y", function(d, i) {
    return (legendSpace3) + i * (legendSpace3) + 6;
  })
  .text(function(d, i) {
    return d.team;
  });
