var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 1500 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var team_data = [];

var team_colors = {
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

var svg = d3.select("#chord").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate("+480 + "," + 350 +")");

d3.csv("data/teams.csv",  function(error,data){
	if (error) throw error;
	data.forEach(function(d){
		team_data.push([d.team1,d.team2,d.id]);
})

var chord = viz.chord()
	.data(team_data)
	.chordOpacity(0.5)
	.outerRadius(280)
	.innerRadius(265)
	.fill(function(d){ return team_colors[d]})

d3.select("g").call(chord);
});
