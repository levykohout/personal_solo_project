require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
const isLoggedIn = require('./auth/login');
const googleAuth = require('./routes/googleauth');
const private = require('./routes/private/login');

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
auth.setup();

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', googleAuth);
app.use('/private',isLoggedIn, private);


app.get('/*', function (req, res) {
 if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
} else {

    res.redirect('/auth/google');
  }

});




var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Listening on port', server.address().port);
});
