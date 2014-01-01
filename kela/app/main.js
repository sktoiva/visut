// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "d3", "datepicker"], function($, d3) {
  var timeline = function(){
    
    var w = 2500;
    var h = 150;
    var padding = 40;

    var xScale = d3.time.scale()
                        .domain([new Date(2012, 1, 1), new Date(2014,1,1)])
                        .range([padding, w-padding]);
    var xAxis  = d3.svg.axis()
                       .scale(xScale)
                       .orient("bottom")
                       .ticks(d3.time.month, 1);

    var svg = d3.select("#timeline")
            .append("svg")
            .attr("width", w)  
            .attr("height", h);

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
  };

  // var attachListeners = function(){
  //   $("#calculated_time").asEventStream
  // };

  // attachListeners();

  timeline();
});
