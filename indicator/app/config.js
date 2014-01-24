require.config({
  //shim config
  shim: {
    "d3": {
      exports: "d3"
    },
    "bootstrap": {
      exports: "bootstrap",
      deps: ["jquery"]
    }
  },
  // make components more sensible
  // expose jquery 
  paths: {
    "components": "../bower_components",
    "jquery": "../bower_components/jquery/jquery",
    "d3": "../bower_components/d3.min.js",
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





