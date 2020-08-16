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

//-------------------------CORS SETTING-------------------//
const cors = require('cors');
app.use(cors());
const originWhitelist = ["https://fhuu.github.io/", "http://localhost:3001", "http://localhost:3000"]
var checkWhitelist = (req,callback) => {
    let corsOptions;
    if(originWhitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin : true}
    } else {
        corsOptions = {origin : false}
    }
    callback(null, corsOptions)
}

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
app.use('/user', cors(checkWhitelist), userRoutes);

module.exports = app;