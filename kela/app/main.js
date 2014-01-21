// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["datepicker", "timeline", "jquery"], function(datepicker, timeline, $) {  
  $(document).ready(function(){
    datepicker.init();
    timeline.timeline(new Date());
  });
});
