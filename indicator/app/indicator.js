define(["d3"], function(d3){
    var timeline = function(date){
    date = new Date();

    var w = 2500;
    var h = 150;
    var padding = 40;
    var DAYS = 365 * 2;
    var SECONDS_IN_DAY = 86400000;

    var xScale = d3.time.scale()
                        .domain([date, new Date(date.getTime() + DAYS * SECONDS_IN_DAY)])
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

  return {
    "timeline": timeline
  };
});