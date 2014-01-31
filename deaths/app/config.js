require.config({
  shim: {
    d3: {
      exports: "d3"
    },
    topojson: {
      exports: "topojson"
    },
    bootstrap: {
      exports: "bootstrap"
    }
  },
  paths: {
    requirejs: "../bower_components/requirejs/require",
    d3: "../bower_components/d3/d3",
    bootstrap: "../bower_components/bootstrap/dist/js/bootstrap",
    topojson: "../bower_components/topojson/topojson",
    underscore: "../bower_components/underscore/underscore",
    lodash: "../bower_components/lodash/dist/lodash.compat",
    bacon: "../bower_components/bacon/dist/Bacon"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





