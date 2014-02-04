define(["bacon",
        "lodash",
        "dataHandler",
        "map",
        "Country"], function(Bacon, _, dataHandler, map, Country){

  var interval = 1000;  //milliseconds

  var sum = function(sum, num){
    return sum + num;
  };

  var init = function(err, data){
    var parsed = dataHandler.parseData(err, data);
    var streams = _.map(parsed, function(entries, code){
      var stream = new Bacon.Bus();
      new Country(code, entries, interval, stream);
      return stream;
    });

    var combined = _.reduce(streams, function(acc, curr){ 
      return acc.merge(curr);
    }, new Bacon.Bus());
    
    combined.log();
    combined.map(1).scan(0, sum).log();
  };

  //Load data, start execution and draw the map
  map();
  dataHandler.loadData("app/assets/data/data.csv", init);


  //Calculate death totals and print
  // _.each(streams, function(stream, name){
  //   stream.map(1).scan(0, sum).onValue(function(d){ console.log(name + ": " +  d); });
  // });

  // nonCommunicable.merge(communicable).merge(injuries).map(1).scan(0, sum)
  // .onValue(function(d){ console.log("Total deaths: " + d); });


});