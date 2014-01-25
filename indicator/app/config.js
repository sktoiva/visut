require.config({
  //shim config
  shim: {
    "d3": {
      exports: "d3"
    },
    "underscore": {
      exports: "_"
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
    "d3": "../bower_components/d3/d3.min",
    "underscore": "../bower_components/underscore/underscore-min",
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





