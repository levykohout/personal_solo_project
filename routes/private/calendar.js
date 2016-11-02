const router = require('express').Router();
const passport = require('passport');

    var gcal = require('google-calendar');
    // var google_calendar = new gcal.GoogleCalendar(accessToken);

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
  console.log('req.user', req.user);
  oauth2Client.setCredentials({
    access_token: req.user.accesstoken,
    refresh_token: req.user.refreshtoken,
  });
  console.log('oauth2Client', oauth2Client);
  var OMGEVENTS = listEvents(oauth2Client.refresh_token);
  res.send(OMGEVENTS);
};

function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    var events = response.items;

    return events;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}

module.exports = router;
