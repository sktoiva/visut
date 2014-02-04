define(["d3"], function(d3){

  var loadData = function(path, callback){
    d3.csv(path, callback);
  };

  var parseData = function(err, data){
      return d3.nest()
               .key(function(d){ return d.Country_Code; })
               .key(function(d){ return d.Indicator_Name; })
               .rollup(function(d){ return parseFloat(d[0].Value); })
               .map(data);
  };

  return {
    loadData: loadData,
    parseData: parseData
  };

});