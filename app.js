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
        secure : false,
        maxAge: 360000
    }
}))

//---------------------Cors on expressjs---------------------------//
//source https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://fhuu.github.io/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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