angular.module('myApp')
    .controller('BootstrapCalendarCtrl', BootstrapCalendarCtrl);

function BootstrapCalendarCtrl(moment, alert, calendarConfig, ProductService) {
    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
        }
    }];
    vm.events = [];

    vm.cellIsOpen = false;

    vm.addEvent = function(startTime, endTime, eventName) {
        var data = {
            startTime: startTime,
            endTime: endTime,
            eventName: eventName
        };
        ProductService.addToCalendar(data).then(function(response) {
            vm.getCalendarEvents();

        });

    };

    vm.eventClicked = function(event) {
        //   alert.show('Clicked', event);

    };

    vm.eventEdited = function(event) {
        alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
        alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
        alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

        if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                vm.cellIsOpen = false;
            } else {
                vm.cellIsOpen = true;
                vm.viewDate = date;
            }
        }

    };

    vm.getCalendarEvents = function() {
        ProductService.getCalendarEvents().then(function(response) {
            console.log('inside calendar events', response.data);
            vm.eventsArray = response.data;
            // var i = 0;
            vm.events.length = 0;
            vm.eventsArray.forEach(function(data) {
                // var data = vm.eventsArray[i];
                console.log(data);

                vm.events.push({
                    title: data.event_name,
                    startsAt: new Date(data.start_time),
                    endsAt: new Date(data.end_time),
                    color: calendarConfig.colorTypes.important,
                    draggable: false,
                    resizable: false,
                    incrementsBadgeTotal: false
                });
                // i++;
            }); //End of for each
            console.log('New vm.events', vm.events);

        });

    };
    vm.getCalendarEvents();

} //End of BootstrapCalendarCtrl
