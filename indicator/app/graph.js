define(["d3", "underscore", "indicator"], function(d3, _, indicator){

  var loadData = function(callback){
    d3.json("app/data.json", callback);
  };


  var buildGraph = function(element){
    return function test(data){
      var table = d3.select(element).append("table"),
          thead = table.append("thead"),
          tbody = table.append("tbody"),
          columns = ["Type", "Death Toll", "Participants", "Indicator"];
      //table styling
      table.classed({"table": true, "table-condensed": true, "table-hover": true});

      //table header
      thead.append("tr").selectAll("th")
           .data(columns)
           .enter()
           .append("th")
           .text(function(d){ return d; });

      //create rows
      var rows = tbody.selectAll("tr")
                      .data(data)
                      .enter()
                      .append("tr");

      //insert data
      rows.selectAll("td").data(function(row){
            var temp = _.map(row, function(value, key){
              return {column: key, value: value};
            });
            temp.push({column: "indicator", value: indicator.calculate(row.deathToll, row.participants).toFixed(2)});
            return temp;
          })
         .enter()
         .append("td")
         .text(function(d){ return d.value; });
      };
  };

  var init = function(){
    var graph = ".container";
    loadData(buildGraph(graph));
  };

  return {
    init: init
  };

});