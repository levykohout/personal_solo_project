angular.module('myApp')
.controller('CalendarController', CalendarController);



function CalendarController($http) {
    console.log('Calendar Controller Loaded!');

    var calendarListUrl='https://wwww.googleapis.com/calendar/v3/users/me/calendarList';

  var calendar = this;
  calendar.data = '';

  $http.get('/private/calendar')
    .then(function (response) {
        console.log(response);
      if (response.data.err) {
        calendar.data = 'Sorry, you are not logged in!';
      } else {
        calendar.data = response.data.message;
      }
    });
calendar.getList=function(){
$http.get(calendarListUrl).then(function(response){
    console.log(response);
});
}

calendar.getList();
}
