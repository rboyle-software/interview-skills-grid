const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
require('../src/auth');

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.static(path.join(__dirname, '../styles')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.use(session({ secret: 'CAT', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});


app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);


app.get('/grid', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/grid.html'));
});


app.get('/protected', isLoggedIn, (req, res) => {
    // res.redirect('/auth/grid');
    res.sendFile(path.join(__dirname, '../src/grid.html'));
    // res.send(`Hello ${req.user.displayName}!`);
});


app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendFile(path.resolve(__dirname, '../src/index.html'));
});


app.get('/auth/google/failure', (req, res) =>  {
    res.send('Failed to authenticate!')
});


// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// });


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
