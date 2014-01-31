define(["deaths", "map", "bacon"], function(deaths, map, Bacon){
  map();
  deaths.parseData();

  var sum = function(sum, num){
    return sum + num;
  };

  //Create polling streams
  var nonCommunicable = Bacon.fromPoll(1000, deaths.nonCommunicable);
  var communicable = Bacon.fromPoll(1000, deaths.communicable);
  var injuries = Bacon.fromPoll(1000, deaths.injuries);

  communicable.map(1).scan(0, sum).onValue(function(d){ console.log("Communicable deaths: " +  d); });

  nonCommunicable.merge(communicable).merge(injuries).map(1).scan(0, sum)
  .onValue(function(d){ console.log("Total deaths: " + d); });
  
});