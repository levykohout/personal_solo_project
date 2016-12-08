// angular.module('myApp')
//     .controller('CalendarController', CalendarController);
//
// function CalendarController($http, $sce) {
//     console.log('Calendar Controller Loaded!');
//
//     var calendar = this;
//     calendar.email = '';
//     calendar.url = '';
//     $http.get('/private/calendar')
//         .then(function(response) {
//             console.log(response);
//             if (response.data.err) {
//                 calendar.email = 'Sorry, you are not logged in!';
//             } else {
//                 calendar.email = response.data;
//                 calendar.email = calendar.email.replace('@', '%40');
//                 calendar.url = 'https://calendar.google.com/calendar/embed?showDate=0&amp;showPrint=0&amp;showCalendars=0&amp;mode=WEEK&amp;height=800&amp;wkst=1&amp;bgcolor=%23999999&amp;src=' + calendar.email;
//                 calendar.explicitlyTrustedHtml = $sce.trustAsHtml('<iframe src="' + calendar.url + '&amp;color=%231B887A&amp;ctz=America%2FChicago" style="border-width:0" width="1000" height="800" frameborder="0" scrolling="no"></iframe>');
//                 console.log('calendar.email', calendar.email);
//             }
//         });
//
//
// }
