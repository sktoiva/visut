define([], function(){
  var getBaseLog = function(x, y) {
    return Math.log(y) / Math.log(x);
  };

  return {
    calculate: function(deathToll, people){
                return getBaseLog(10, people/deathToll);
               }
  };

});