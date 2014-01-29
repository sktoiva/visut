require.config({
  shim{
    d3: {
      exports: "d3"
    },
    bootstrap: {
      exports: "bootstrap"
    }
  },
  paths: {
    requirejs: "../bower_components/requirejs/require",
    d3: "../bower_components/d3/d3",
    bootstrap: "../bower_components/bootstrap/dist/js/bootstrap"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





