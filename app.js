const express = require("express");
const app = express();

//----------------body parser-----------------//
const bodyparser = require("body-parser");
app.use(bodyparser.json());

//------------------Session setup------------------//
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized : true,
    cookie : {
        secure : "auto",
        maxAge: 360000
    }
}))

//----------------------Database---------------------------//
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/yuk' : "mongodb://localhost:27017/yuk");
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true, useCreateIndex : true})
    .then(() => {
        console.log("connected to database on fhuuka cluster");
    })
    .catch((error) => {
        console.log("error connecting to database on fhuuka cluster");
        console.log(error);
    });

//------------------------Passport-------------------------//
const User = require("./Model/User");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---------------------------Routes--------------------------//
const userRoutes = require("./Routes/UserRoutes");
app.use('/user', userRoutes);

module.exports = app;