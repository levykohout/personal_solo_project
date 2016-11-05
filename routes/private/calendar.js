const router = require('express').Router();
const passport = require('passport');

    var gcal = require('google-calendar');


// var google = require('googleapis');
// var plus = google.plus('v1');
// var OAuth2 = google.auth.OAuth2;



router.get('/', getCalendarEvents);

function getCalendarEvents(req, res) {
    var accessToken=req.user.accesstoken;
    var user=req.user.email;
    var google_calendar = new gcal.GoogleCalendar(accessToken);

             res.send(user);

};
router.post('/' , addCalendarEvent);

function addCalendarEvent(req, res) {
    console.log(req.body);
    console.log(req.user);
    var accessToken=req.user.accesstoken;
    var user=req.user.email;


    var google_calendar = new gcal.GoogleCalendar(accessToken);

    var event = {
      'summary': req.body.eventName,
    //   'location': '800 Howard St., San Francisco, CA 94103',
      'description': req.body.eventName,
      'start': {
        'dateTime': req.body.startTime,
        // 'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': req.body.endTime,
        // 'timeZone': 'America/Los_Angeles',
      },
    //   'recurrence': [
    //     'RRULE:FREQ=DAILY;COUNT=2'
    //   ],
    //   'attendees': [
    //     {'email': 'lpage@example.com'},
    //     {'email': 'sbrin@example.com'},
    //   ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      },
    };

    google_calendar.events.insert(user, event, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
    });





}


module.exports = router;
