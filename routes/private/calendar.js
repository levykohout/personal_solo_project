const router = require('express').Router();
const passport = require('passport');
var gcal = require('google-calendar');

const url = require('url')

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

// pull in credentials module


if (process.env.APP_STATE == 'dev'){
    var config = {
        database: 'rho'
    };

} else {

 var config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true
    }

}

var pg = require('pg');
var pool = new pg.Pool(config);

router.get('/', getCalendarEvents);

function getCalendarEvents(req, res) {
    // var accessToken=req.user.accesstoken;
    // var user=req.user.email;
    // var google_calendar = new gcal.GoogleCalendar(accessToken);
    //
    //          res.send(user);


                 pool.connect(function(err, client, done) {
                     if (err) {
                         console.log('Error connecting to the DB', err);
                         res.sendStatus(500);
                         done();
                         return;
                     }

                     client.query('SELECT * FROM events', function(err, result) {
                         done();
                         if (err) {
                             console.log('Error querying the DB', err);
                             res.sendStatus(500);

                             return;
                         }

                         console.log('Got rows from the DB:', result.rows);
                         res.send(result.rows);

                     });
});
};


router.post('/' , addCalendarEvent);

function addCalendarEvent(req, res) {

    var start_time = new Date(req.body.startTime);
    var end_time = new Date(req.body.endTime);
    var user_id = req.user.googleid;
    var event_name =req.body.eventName;
    console.log(start_time);
    console.log(end_time);


    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }

        client.query('INSERT INTO events (start_time, end_time, event_name, user_id) VALUES ($1, $2, $3, $4) returning *;', [start_time, end_time, event_name, user_id], function(err, result) {
            done();
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);

        });
    });


//For Google Calendar
// console.log(req.body);
// console.log(req.user);
// var accessToken=req.user.accesstoken;
// var user=req.user.email;
//
//
//     var google_calendar = new gcal.GoogleCalendar(accessToken);
//
//     var event = {
//       'summary': req.body.eventName,
//     //   'location': '800 Howard St., San Francisco, CA 94103',
//       'description': req.body.eventName,
//       'start': {
//         'dateTime': req.body.startTime,
//         // 'timeZone': 'America/Los_Angeles',
//       },
//       'end': {
//         'dateTime': req.body.endTime,
//         // 'timeZone': 'America/Los_Angeles',
//       },
//     //   'recurrence': [
//     //     'RRULE:FREQ=DAILY;COUNT=2'
//     //   ],
//     //   'attendees': [
//     //     {'email': 'lpage@example.com'},
//     //     {'email': 'sbrin@example.com'},
//     //   ],
//       'reminders': {
//         'useDefault': false,
//         'overrides': [
//           {'method': 'email', 'minutes': 24 * 60},
//           {'method': 'popup', 'minutes': 10},
//         ],
//       },
//     };
//
//     google_calendar.events.insert(user, event, function(err, event) {
//       if (err) {
//         console.log('There was an error contacting the Calendar service: ' + err);
//         return;
//       }
//       console.log('Event created: %s', event.htmlLink);
//     });
//
//



}


module.exports = router;
