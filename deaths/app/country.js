define('Country', [], function(){

  function Country(code, data, interval, stream){    
    this.country = code;
    this.communicable = data.cause_communicable/100;
    this.nonCommunicable = data.cause_non_communicable/100;
    this.injuries = data.cause_injury/100;
    this.deathRate = data.death_rate;
    this.population = data.population;
    this.interval = interval;
    this.stream = stream;

    var timeSpan = 365 * 24 * 60 * 60; //days * hours * minutes * seconds
 
    var lambda = (this.deathRate * this.population/1000)/timeSpan,
        k = 1;

    this.deathProbabilityInSecond = this._poissonDistribution(lambda, k);

    setInterval(this.death.bind(this), this.interval);
  }

  Country.prototype._factorial = function(n){
    return n === 0 ? 1 : n * this._factorial(n - 1);
  };

  Country.prototype._poissonDistribution = function(lambda, k){
    return Math.exp(-lambda) * Math.pow(lambda, k)/this._factorial(k);
  };

  Country.prototype.death = function(){
    var rand = Math.random(),
        type;

    if(rand < this.deathProbabilityInSecond){
      rand = Math.random();
      if(rand < this.communicable){
        type = "communicable";
      }else if(rand > this.communicable && rand < this.nonCommunicable + this.communicable){
        type = "nonCommunicable";
      }else{
        type = "injury";
      }
      var retVal = {};
      retVal[this.country] = type;
      this.stream.push(retVal);
    }
  };

  return Country;
});