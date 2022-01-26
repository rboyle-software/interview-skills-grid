const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/UserModel')
require('dotenv').config();


const initialSkills = [
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
    {status: 'outstanding', value: ''},
];


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    User.findById(user)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err))
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://interview-skills-grid.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.name.givenName
        },
        function (err, user) {
            return cb(err, user);
        });
    }
));

// User.findOneAndUpdate( { googleId: profile.id }, { $set: { "boardContent": [ { "value": "TEST" } ] } } );


// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
