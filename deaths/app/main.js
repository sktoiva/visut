define(["bacon",
        "lodash",
        "dataHandler",
        "map",
        "Country"], function(Bacon, _, dataHandler, map, Country){

  var nonCommunicable = new Bacon.Bus(),
      communicable = new Bacon.Bus(),
      injuries = new Bacon.Bus();

  var streams = {"Non-communicable": nonCommunicable, "Communicable": communicable, "Injuries": injuries};

  var init = function(err, data){
    var tick = Bacon.interval(1000, 1),
        parsed = dataHandler.parseData(err, data);

    _.each(parsed, function(entries, code){
      var country = new Country(code, entries, communicable, nonCommunicable, injuries);
      tick.onValue(function(){
        country.death(); // Why this needs to be inside an anonymous function???
      });
    }); 
  };

  var sum = function(sum, num){
    return sum + num;
  };

  //Load data, start execution and draw the map
  map();
  dataHandler.loadData("app/assets/data/data.csv", init);


  //Calculate death totals and print
  _.each(streams, function(stream, name){
    stream.map(1).scan(0, sum).onValue(function(d){ console.log(name + ": " +  d); });
  });

  nonCommunicable.merge(communicable).merge(injuries).map(1).scan(0, sum)
  .onValue(function(d){ console.log("Total deaths: " + d); });
  
});