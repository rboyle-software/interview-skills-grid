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

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
}

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
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        console.log('User is not logged in!')
        res.sendStatus(401);
    }
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/temp', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/temp.html'));
});

app.get('/auth-failed', (req, res) => {
    res.send('Authorization Failed!');
    res.redirect('/test');
});


app.get('/skills-grid', isLoggedIn, (req, res, next) => {
    res.sendFile(path.join(__dirname, '../src/grid.html'));
});


app.get('/user-skills', userController.getUserSkills, (req, res) => {
    res.status(200).json(res.locals.user);
});

app.put('/user-skills', userController.updateUserSkills, (req, res) => {
    res.sendStatus(200);
});



// authorize with Google
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth-failed'
    }),
    (req, res) => {
        res.redirect('/skills-grid');
    });


// authorize with GitHub
app.get('/auth/github',
    passport.authenticate('github', {
        scope: [ 'user:email' ]
    }));

app.get('/auth/github/callback', 
    passport.authenticate('github', {
        failureRedirect: '/auth-failed'
    }),
    (req, res) => {
        res.redirect('/skills-grid');
    });


// authorize with Facebook
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: [ 'email', 'public_profile' ]
    }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth-failed'
    }),
    (req, res) => {
        res.redirect('/skills-grid');
    });


app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});


app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('An error has occurred!');
});


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

