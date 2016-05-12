/*
 * autor: Miller Augusto S. Martins
 * e-mail: miller.augusto@gmail.com
 * github: miamarti
 * */
(function(window, document) {
    "use strict";
    (angular.module('ng.daterange', [ 'ng' ])).directive('ngDateRange', [ function() {
	var container = function(scope, element, attrs) {
	    var html = '';
	    html += '<div class="btn btn-circle blue">';
	    html += '	<i class="fa fa-calendar"></i> &nbsp; <span> ' + moment(scope.modalDates.startDate,'YYYY-MM-DD').format('D MMMM, YYYY') + ' - ' + moment(scope.modalDates.endDate,'YYYY-MM-DD').format('D MMMM, YYYY') + ' </span> <b class="fa fa-angle-down"></b>';
	    html += '</div>';
	    $(element).html(html);
	    var divContainer = $(element).find('div').get(0);

	    var config = {
		opens : 'left',
		startDate : moment(scope.modalDates.startDate,'YYYY-MM-DD'),
		endDate : moment(scope.modalDates.endDate,'YYYY-MM-DD'),
		minDate : scope[attrs.min],
		maxDate : new Date(),
		dateLimit : {
		    days : 3650
		},
		showDropdowns : true,
		showWeekNumbers : false,
		timePicker : false,
		timePickerIncrement : 1,
		timePicker12Hour : true,
		ranges : {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		buttonClasses : [ 'btn' ],
		applyClass : 'green-jungle',
		cancelClass : 'red-intense',
		format : 'MM/DD/YYYY',
		separator : ' até ',
		locale : {
		    applyLabel : 'Apply',
		    cancelLabel : 'Cancel',
		    fromLabel : 'from',
		    toLabel : 'to',
		    customRangeLabel : 'custom range',
		    daysOfWeek : [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
		    monthNames : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		    firstDay : 1
		}
	    };

	    var callback = function(start, end) {
		scope[attrs.bind].startDate = start.format('YYYY-MM-DD');
		scope[attrs.bind].endDate = end.format('YYYY-MM-DD');
        scope.dateChanged();
		$($(divContainer).find('span').get(0)).html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'));
	    };

	    $(divContainer).daterangepicker(config, callback);
	};
	return {
	    restrict : 'E',
	    link : container
	};
    } ]);
})(window, document);
