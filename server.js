const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const dbURL = "mongodb+srv://adminuser:useradmin@fhuuka.hccpa.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true})
    .then(() => {
        console.log("connected to database on fhuuka cluster");
    })
    .catch(() => {
        console.log("error connecting to database on fhuuka cluster");
    });

app.listen(port, () => {
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})