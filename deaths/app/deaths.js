define(["d3", "lodash", "bacon"], function(d3, _, Bacon){

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

  var communicable = function(){ return new Bacon.Next("communicable"); };
  var nonCommunicable = function(){ return new Bacon.Next("non communicable"); };
  var injuries = function(){ return new Bacon.Next("injuries"); };

  return {
    parseData: parseData,
    communicable: communicable,
    nonCommunicable: nonCommunicable,
    injuries: injuries
  };
});