const router = require('express').Router();
const passport = require('passport');

    var gcal = require('google-calendar');


var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

// const auth = require('../db/connection');

var oauth2Client = new OAuth2(
  '907193122888-0cjobnsgokbtstp1bpfdcrluutu2geri.apps.googleusercontent.com',
  'KNdAuOCAkfEO--VblecevBbX',
  'http://localhost:3000/auth/google/callback'
);

router.get('/', getCalendarEvents);

function getCalendarEvents(req, res) {
    var accessToken=req.user.accesstoken;
    var user=req.user.email;
 var google_calendar = new gcal.GoogleCalendar(accessToken);
var events=[];

google_calendar.events.list(req.user.email, function(err, calendarList) {

    if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }

        events = calendarList.items;
console.log('events',events);
            //  res.send(events);
             res.send(user);

});


};


module.exports = router;
