const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require('../models/UserModel');
const AlgoPromptModel = require('../models/AlgoPromptModel');


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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
    next();
});



app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));