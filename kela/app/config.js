require.config({
  //shim config
  shim: {
    "d3": {
      exports: "d3"
    },
    "bootstrap": {
      exports: "bootstrap",
      deps: ["jquery"]
    },
    "bootstrap-datepicker": {
      exports: "bootstrap-datepicker",
      deps: ["jquery", "bootstrap"]
    },
    "bootstrap-datepicker-fi": {
      exports: "bootstrap-datepicker-fi",
      deps: ["jquery", "bootstrap"]
    },
  },
  // make components more sensible
  // expose jquery 
  paths: {
    "components": "../bower_components",
    "jquery": "../bower_components/jquery/jquery",
    "bacon": "../bower_components/bacon/dist/bacon.min",
    "d3": "//d3js.org/d3.v3.min",
    "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap.min",
    "bootstrap-datepicker": "../bower_components/bootstrap-datepicker/js/bootstrap-datepicker",
    "bootstrap-datepicker-fi": "../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.fi",
    "moment": "../bower_components/momentjs/min/moment-with-langs.min",
    "holidays-fi": "../moment_plugins/holidays-fi"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





