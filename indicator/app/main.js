// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["indicator", "jquery"], function(indicator, $) {  
  $(document).ready(function(){
    indicator.init();
  });
});
