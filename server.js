const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


//----------------Server setup-----------------//
app.listen(port, () => {
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})

//------------------Session setup------------------//
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    genid: function(req) {
        return genuuid()
    },
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
const dbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/personalhubdb";
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true})
    .then(() => {
        console.log("connected to database on fhuuka cluster");
    })
    .catch((error) => {
        console.log("error connecting to database on fhuuka cluster");
        console.log(error);
    });

//------------------------Session--------------------------//


//------------------------Passport-------------------------//