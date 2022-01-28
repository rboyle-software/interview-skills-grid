const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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


// User.findOneAndUpdate( { googleId: profile.id }, { $set: { "boardContent": [ { "value": "TEST" } ] } } );

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, cb) {
        // console.log('GOOGLE PROFILE:', profile);
        console.log('GOOGLE PROFILE ID:', profile.id);
        User.findOrCreate({
            userId: profile.id
        },
        function (err, user) {
            return cb(err, user);
        });
    }
));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        // console.log('GITHUB PROFILE:', profile);
        console.log('GITHUB PROFILE ID:', profile.id);
        User.findOrCreate({
            githubId: profile.id
        },
        function (err, user) {
            return done(err, user);
        });
    }
));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log('FACEBOOK PROFILE:', profile);
        console.log('FACEBOOK PROFILE ID:', profile.id);
        User.findOrCreate({
            facebookId: profile.id
        },
        function (err, user) {
            return cb(err, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    console.log('SERIALIZE USER:', user);
    console.log('SERIALIZE USER.ID:', user.id);
    console.log('SERIALIZE USER.USERID:', user.userId);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('DESERIALIZE ID:', id);
    User.findById(id)
        .then((id) => {
            done(null, id);
        })
        .catch((err) => done(err))
});