const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})

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

