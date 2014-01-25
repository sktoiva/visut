// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["graph", "jquery"], function(graph, $) {  
  $(document).ready(function(){
    graph.init();
  });
});
