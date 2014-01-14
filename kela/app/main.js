// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["datepicker", "timeline"], function(datepicker, timeline) {  
  datepicker.init();
  timeline.timeline(new Date());
});
