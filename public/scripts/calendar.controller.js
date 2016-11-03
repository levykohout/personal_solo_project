angular.module('myApp')
.controller('CalendarController', CalendarController);



function CalendarController($http,$sce) {
    console.log('Calendar Controller Loaded!');

    var calendarListUrl='https://wwww.googleapis.com/calendar/v3/users/me/calendarList';

  var calendar = this;
  calendar.email = '';
calendar.url='';
  $http.get('/private/calendar')
    .then(function (response) {
        console.log(response);
      if (response.data.err) {
        calendar.email = 'Sorry, you are not logged in!';
      } else {
        calendar.email = response.data;
        calendar.email=calendar.email.replace('@','%40');
        calendar.url ='https://calendar.google.com/calendar/embed?src='+calendar.email+'&ctz=America/Chicago';
        calendar.explicitlyTrustedHtml= $sce.trustAsHtml('<iframe src="'+ calendar.url+'" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>');

        console.log('calendar.email', calendar.email);
      }
    });


}
