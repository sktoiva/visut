define(["lodash", "d3", "topojson"], function(_, d3, topojson){
  var createMap = function(){
    var width = 960,
    height = 960;

    var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(0.1);

    var path = d3.geo.path()
    .projection(projection);

    var graticule = d3.geo.graticule();

    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

    d3.json("app/assets/data/topo_ne_50m_admin_0_countries.json", function(error, world) {
      svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.world))
      .attr("class", "land")
      .attr("d", path);

      svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.world, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

      svg.selectAll(".circle")
        .data(topojson.feature(world, world.objects.world).features)
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("r", 2);

      svg.selectAll(".text")
        .data(topojson.feature(world, world.objects.world).features)
        .enter().append("text")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d){ return d.id; });
    });

    d3.select(self.frameElement).style("height", height + "px");
  };
  
  return createMap;
});