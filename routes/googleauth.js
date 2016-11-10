const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope:
    ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/calendar',
    'https://mail.google.com'],
    }
  ));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/private',
    failureRedirect: '/',
  }));

  router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.json({ status: true, name: req.user.google_name });
  } else {
    res.json({ status: false });
  }

});

router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200); // they made it!
});





module.exports = router;
