require.config({
  //shim config
  shim: {
    "d3": {
      exports: "d3"
    }
  },
  // make components more sensible
  // expose jquery 
  paths: {
    "components": "../bower_components",
    "jquery": "../bower_components/jquery/jquery",
    "d3": "//d3js.org/d3.v3.min"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





