const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/UserModel');
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            userId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.name.givenName,
            imageUrl: profile.photos[0].value,
            provider: profile.provider,
            boardContent: initialSkills()
        }
        try {
            let user = await User.findOne( { userId: profile.id } );
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }
));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: 'user:email'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            userId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName.split(' ')[0],
            imageUrl: profile.photos[0].value,
            provider: profile.provider,
            boardContent: initialSkills()
        }
        try {
            let user = await User.findOne( { userId: profile.id } );
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }
));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: [ 'id', 'emails', 'name' ]
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            userId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.name.givenName,
            imageUrl: 'Facebook-Blacklist-Zuckerberg.jpg',
            provider: profile.provider,
            boardContent: initialSkills()
        }
        try {
            let user = await User.findOne( { userId: profile.id } );
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((id) => {
            done(null, id);
        })
        .catch((err) => done(err))
});


const initialSkills = () => {
    const skills = [];
    skills.length = 16;
    skills.fill({status: 'outstanding', value: ''}, 0, 16);
    return skills;
}
