define('Country', [], function(){

  function Country(code, data, communicableStream, nonCommunicableStream, injuriesStream){    
    this.country = code;
    this.communicable = data.cause_communicable/100;
    this.nonCommunicable = data.cause_non_communicable/100;
    this.injuries = data.cause_injury/100;
    this.deathRate = data.death_rate;
    this.population = data.population;
    this.communicableStream = communicableStream;
    this.nonCommunicableStream = nonCommunicableStream;
    this.injuriesStream = injuriesStream;

    var secondsInYear = 365 * 24 * 60 * 60,
        lambda = (this.deathRate * this.population/1000)/secondsInYear,
        k = 1;

    this.deathProbabilityInSecond = this._poissonDistribution(lambda, k);
  }

  Country.prototype._factorial = function(n){
    return n === 0 ? 1 : n * this._factorial(n - 1);
  };

  Country.prototype._poissonDistribution = function(lambda, k){
    return Math.exp(-lambda) * Math.pow(lambda, k)/this._factorial(k);
  };

  Country.prototype.death = function(){
    var rand = Math.random();
    if(rand < this.deathProbabilityInSecond){
      rand = Math.random();
      if(rand < this.communicable){
        this.communicableStream.push(this.country);
      }else if(rand > this.communicable && rand < this.nonCommunicable + this.communicable){
        this.nonCommunicableStream.push(this.country);
      }else{
        this.injuriesStream.push(this.country);
      }
    }
  };

  return Country;
});