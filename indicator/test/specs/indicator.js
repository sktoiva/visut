define(function(require) {
  var indicator = require('../../app/indicator');

  describe("Indicator", function(){
    it("should calculate correctly dangerousness indicator 1", function(){
      indicator.calculate(10, 5000).should.be.within(2.6, 2.7);
    });

    it("should calculate correctly dangerousness indicator 2", function(){
      indicator.calculate(10, 5000000).should.be.within(5.6, 5.7);
    });

    it("should calculate correctly dangerousness indicator 3", function(){
      indicator.calculate(1, 36590).should.be.within(4.5, 4.6);
    });
  });
});