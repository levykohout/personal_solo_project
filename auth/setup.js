const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

//const config = require('module');
const User = require('../models/user');

exports.setup = function () {


  passport.use(new GoogleStrategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    clientID: '907193122888-0cjobnsgokbtstp1bpfdcrluutu2geri.apps.googleusercontent.com',
    clientSecret: 'KNdAuOCAkfEO--VblecevBbX',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },

  function (accessToken, refreshToken, profile, cb) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile email',profile.email);
    findOrCreate(profile.id, profile.email, accessToken, refreshToken, function (err, user) {
      return cb(err, user);
    });
  }


));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  console.log('serialize:', user);
  done(null, user.googleid);

});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    done(err);
  });
});

};

// @TODO: is the return done right?
function findOrCreate(googleID, googleEmail, accessToken, refreshToken, done) {
  // return new Promise(function (resolve, reject) {
    console.log('googleID', googleID);

    User.findById(googleID, googleEmail, accessToken, refreshToken).then(function (user) {
      console.log('user', user);
      if (user) {
          // update access and refresh token
          User.updateTokens(googleID, googleEmail, accessToken, refreshToken);
            console.log('update user', user);
                  return done(null, user);


      }

      if (!user) {
        console.log('inside!user');
        User.create(googleID, googleEmail, accessToken, refreshToken).then(function (user) {
          console.log('create user', user);
          return done(null, user);
        });

        // return done(null, googleID.googleid);
      };


      // @TODO how do I set this up if undefined is returned
    }).catch(function (err) {
      console.log('Error finding user', err);
      done(err);
    });
  // });
}
