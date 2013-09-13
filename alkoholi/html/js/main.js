var config = {
    width: 1000,
    height: 500,
    padding: 20
};

var AlcoholViz = {
  nest: function(data){
    return  d3.nest()
    .key(function(d) {
      return d.min_ika + " - " + d.max_ika;
    })
    .sortKeys(function(a, b) {
        var aVal = parseInt(a.split(' ')[0], 10);
        var bVal = parseInt(b.split(' ')[0], 10);

        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
     })
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
    //return d3.scale.linear().domain([1865, 2012]).range([0, config.width]);
    return d3.time.scale().domain([new Date('1865'), new Date('2012')]).range([0, config.width]);
  },

  yScale: function(layers){
    var values = d3.merge(layers.map(function(d){return d.values;}));
    var min = d3.min(values, function(d) { return d.y; });
    var max = d3.max(values, function(d) { return d.y0 + d.y; });

    return d3.scale.linear()
             .domain([min, max])
             .range([config.height-config.padding, 0]);
  },

  area: function(xScale, yScale){
   return d3.svg.area()
    .x(function(d) {
      return xScale(new Date("" + d.x));
    })
    .y0(function(d) {
      return yScale(d.y0);
    })
    .y1(function(d) {
      return yScale(d.y + d.y0);
    });
  },

  colorIndex: 0,

  incrementColorIndex: function(){
    this.colorIndex += 1;
    return this.colorIndex;
  },

  color: function(){
    return d3.scale.linear().range(["#aad", "#556"]).domain([0, 89]);
  }
};

d3.tsv("../data/jakauma.tsv", function(data) {
  var stack = AlcoholViz.stack();
  var nest = AlcoholViz.nest(data);
  console.log(nest);
  var layers = stack(nest.map(AlcoholViz.initData));
  console.log(layers);
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
    .style("fill", function(d) { return color(d.key.split(' ')[0]); })
    .append("title").text(function(d){
      return d.key;
    });
   
  var xAxis = d3.svg.axis().scale(xScale).tickSize(-config.height);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (config.height-config.padding) + ")")
    .call(xAxis);
});


