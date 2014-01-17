define(['jquery',
        'moment',
        'holiday-fi',
        'timeline',
        'bootstrap',
        'bootstrap-datepicker',
        'bootstrap-datepicker-fi',
        'bacon'], function($, moment){

  var init = function(){
    moment.lang("FI");
    createDatepicker();
    attachStream();
  };

  var createDatepicker = function(){
    $(".datepicker").datepicker({
      language: "fi"
    });
  };


  var maternityLeaveRange = function(calculatedTime){
      return formatDate(calculatedTime.subtract("days", 30)) + " - " + formatDate(calculatedTime.add("days", 105-30));
  };

  var formatDate = function(date){
      return date.format("DD.MM.YYYY");
  }; 

  var attachStream = function(){
    var dates = $(".datepicker").asEventStream("changeDate");
    var paternityLeave = $("#paternity-leave"),
        maternityLeave = $("#maternity-leave"), 
        fatherMonth = $("#father-month"),
        childCareLeave = $("#childcare-leave");

    dates.onValue(function(val){ 
      var current = moment(val);
      paternityLeave.text( maternityLeaveRange(current) );
      maternityLeave.text( moment(val) );
      fatherMonth.text( moment(val) );
      childCareLeave.text( moment(val) );
    });

  };

  return {
    init: init
  };
});
