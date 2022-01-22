const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const model = require('./server/models/UserModel');
// const model = require('./server/models/PromptModel');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../images')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(cookieParser());

app.get('/', (req, res, next) => {
    next();
})



app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));