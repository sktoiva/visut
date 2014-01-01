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
    "bacon": "../bower_components/bacon/bacon",
    "d3": "//d3js.org/d3.v3.min",
    "bootstrap-datepicker": "../bower_components/bootstrap-datepicker/js/bootstrap-datepicker",
    "bootstrap-datepicker-fi": "../bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.fi"
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}





