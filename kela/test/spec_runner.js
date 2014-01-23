require.config({
  baseUrl: '/tests/',
  paths: {
    'mocha'         : '../node_modules/mocha/mocha',
    'chai'          : '../node_modules/chai/chai',
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});
 
require(['require', 'chai', 'mocha'], function(require, chai){
 
  // Chai
  var should = chai.should();
 
  /*globals mocha */
  mocha.setup('bdd');
 
  require([
    'specs/leaves.js',
  ], function(require) {
    mocha.run();
  });
 
});