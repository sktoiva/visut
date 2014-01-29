define(["d3", "lodash"], function(d3, _){

  var parseData = function(){
    d3.csv("app/assets/data/data.csv", function(err, data){
      var nest = createNest(data);

      var deathsPerCountry = _.map(nest, numberOfDeaths);
      console.log(deathsPerCountry);

      var sumOfDeaths = _.chain(deathsPerCountry)
                         .compact()
                         .reduce(function(sum, num){ 
                                    return sum + num; })
                         .value();

      var yearInSeconds = 365 * 24 * 60 * 60; //days * hours * minutes * seconds
      console.log(sumOfDeaths/yearInSeconds);
    });
  };

  var createNest = function(data){
      return d3.nest()
               .key(function(d){ return d.Country_Code; })
               .key(function(d){ return d.Indicator_Name; })
               .rollup(function(d){ return parseFloat(d[0].Value); })
               .map(data);
  };

  var numberOfDeaths = function(entries, country){
    console.log(country);
    return entries.death_rate * entries.population/1000;
  };

  return function() { 
    parseData();
  };
});