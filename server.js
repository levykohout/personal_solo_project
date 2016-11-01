const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');

var isLoggedIn = require('./auth/login');

// const login = require('./routes/private/login');
// const itemRouter = require('./routes/private/items');
const googleAuth = require('./routes/googleauth');
// const googleCalendar = require('./routes/calendar');
const private = require('./routes/private/login');

auth.setup();

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};

const app = express();


app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/login', login);
app.use('/auth', googleAuth);
// app.use('/calendar', googleCalendar);
app.use('/private',isLoggedIn, private);

// everything beyond this point must be authenticat

// app.use('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/views/index.html'));
// });
app.get('/*', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
  } else {
    res.redirect('/auth/google');
  }

});


var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
