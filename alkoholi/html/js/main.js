d3.tsv("../data/jakauma.tsv", function(data) {

  var width = 1960,
    height = 1500;

  var nest = d3.nest()
    .key(function(d) {
      return d.min_ika;
    })
    .sortKeys(d3.descending)
    .entries(data);

  console.log(nest);

  var layers = nest.map(function(d) {
    return {
      "key": d.key,
      "values": d.values.map(function(ageGroup, i) {
        return {
          "x": i,
          "y": ageGroup.ikaluokka,
          "y0": 0
        };
      })
    };
  });

  console.log(layers);

  var stack = d3.layout.stack()
    .offset("wiggle")
    .values(function(d) {
      return d.values;
    });

  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var xScale = d3.scale.linear().range([0, width]);
  var yScale = d3.scale.linear()
    .domain(
      [
        d3.min(data, function(d) {
          return d.ikaluokka;
        }),
        d3.max(data, function(d) {
          return d.ikaluokka;
        })
      ]
    )
    .range([height, 0]);

  var area = d3.svg.area()
    .x(function(d) {
      return xScale(d.x);
    })
    .y0(height)
    .y1(function(d) {
      return yScale(d.y);
    });

var color = d3.scale.linear()
     .range(["#aad", "#556"]);

  svg.selectAll("path")
    .data(stack(layers))
    .enter().append("path")
    .attr("d", function(d) {
      return area(d.values);
    })
    .style("fill", function() { return color(Math.random()); })
    .append("title").text(function(d){
      return d.key;
    });
   
});

