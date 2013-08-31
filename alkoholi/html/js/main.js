var config = {
    width: 640,
    height: 340
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
          "x": ageGroup.Vuosi,
          "y": ageGroup.ikaluokka,
        };
      })
    };
  },

  stack: function() {
    return d3.layout.stack()
                .offset("silhouette")
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

  yScale: function(data){
    //console.log(data);
    var min = 0;//d3.min(data, function(d) { return d.ikaluokka; });
    var max = 500000;//d3.max(data, function(d) { return d.values;});

    console.log("Min: " + min);
    console.log("Max: " + max);

    return d3.scale.linear()
             .domain([max,min])
             .range([0, config.height]);
  },

  area: function(xScale, yScale){
   return d3.svg.area()
    .x(function(d) {
      return xScale(d.x);
    })
    .y0(config.height)
    .y1(function(d) {
      return yScale(d.y);
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
  var yScale = AlcoholViz.yScale(nest);
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


