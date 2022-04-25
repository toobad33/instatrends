var base = d3.select("#vis");
var chart = base.append("canvas")
  .attr("width", 400)
  .attr("height", 300);

var context = chart.node().getContext("2d");
var data = d3.csv("./likes_length.csv")
// var data = [1,2,13,20,23];

var scale = d3.scale.linear()
  .range([10, 390])
  .domain([1,23]);

data.forEach(function(d, i) {
  context.beginPath();
  //context.rect(scale(d), 150, 10, 10);
  context.arc(scale(d.length), d.likes, 5, 0, 2 * Math.PI);
  context.fillStyle="blue";
  context.fill();
  context.closePath();
});