const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const GitHubStrategy = require('passport-github2');


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: '228310719683-7epchj0frg9l9g4g19k9o2tfijlvpoko.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {

      return done(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));


passport.use(new GitHubStrategy({
    clientID: '7d8eebaa77b55b845660',
    clientSecret: 'c25db547f6a448d5590649fe6d460954bfbb6d3c',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });
