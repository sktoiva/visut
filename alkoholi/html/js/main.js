var config = {
    width: 1000,
    height: 500
};

var AlcoholViz = {
  nest: function(data){
    return  d3.nest()
    .key(function(d) {
      return d.min_ika;
    })
    .sortKeys(d3.ascending)
    .entries(data);
  },

  initData: function(element) {
    return {
      "key": element.key,
      "values": element.values.map(function(ageGroup) {
        return {
          "x": parseInt(ageGroup.Vuosi, 10),
          "y": parseInt(ageGroup.ikaluokka, 10),
        };
      })
    };
  },

  stack: function() {
    return d3.layout.stack()
                .offset("wiggle")
                .values(function(d) {
                  return d.values;
                });
  },

  svg: function() {
    return d3.select("body")
              .append("svg")
              .attr("width", config.width)
              .attr("height", config.height);
  },

  xScale: function(){
    return d3.scale.linear().domain([1865, 2012]).range([0, config.width]);
  },

  yScale: function(layers){
    var values = d3.merge(layers.map(function(d){return d.values;}));
    var min = d3.min(values, function(d) { return d.y; });
    var max = d3.max(values, function(d) { return d.y0 + d.y; });

    return d3.scale.linear()
             .domain([min, max])
             .range([config.height, 0]);
  },

  area: function(xScale, yScale){
   return d3.svg.area()
    .x(function(d) {
      return xScale(d.x);
    })
    .y0(function(d) {
      return yScale(d.y0);
    })
    .y1(function(d) {
      return yScale(d.y + d.y0);
    });
  },

  color: function(){
    return d3.scale.linear().range(["#aad", "#556"]);
  }
};

d3.tsv("../data/jakauma.tsv", function(data) {
  var stack = AlcoholViz.stack();
  var nest = AlcoholViz.nest(data);
  var layers = stack(nest.map(AlcoholViz.initData));
  var xScale = AlcoholViz.xScale();
  var yScale = AlcoholViz.yScale(layers);
  var area = AlcoholViz.area(xScale, yScale);
  var color = AlcoholViz.color();
  var svg = AlcoholViz.svg();

  svg.selectAll("path")
    .data(layers)
    .enter().append("path")
    .attr("d", function(d) {
      return area(d.values);
    })
    .style("fill", function() { return color(Math.random()); })
    .append("title").text(function(d){
      end = parseInt(d.key,0) + 4;
      return d.key + " - " + end;
    });
   
});


