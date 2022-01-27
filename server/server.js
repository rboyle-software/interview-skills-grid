const express = require('express');
const userController = require('../controllers/userController');
const currentUser = require('../routes/passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const favicon = require('serve-favicon')
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(favicon(path.join(__dirname, '../images', 'favicon.png')));


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});


app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../styles')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(cookieSession({
    name: 'skills-grid',
    keys: ['key1', 'key2']
}));


app.use(session({
    secret: process.env.KEYBOARD_CAT,
    resave: false,
    saveUninitialized: true
}));


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
        console.log('You are not logged in!');
    }
}


app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/auth-failed', (req, res) => {
    res.send('Authorization Failed!');
    res.redirect('/test');
});


app.get('/skills-grid', [isLoggedIn, userController.getCurrent], (req, res) => {
    res.sendFile(path.join(__dirname, '../src/grid.html'));
});


app.patch('/skills-grid', userController.modCurrent, (req, res) => {
    res.sendStatus(200).json();
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth-failed' }), (req, res) => { res.redirect('/skills-grid');
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

