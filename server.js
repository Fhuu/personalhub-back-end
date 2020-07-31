const express = require("express");
const app = express();
app.listen(3000, () => {
    console.log("up and running!");
})

const mongoose = require("mongoose");
const dburl = "mongodb+srv://adminuser:useradmin@fhuuka.hccpa.mongodb.net/<dbname>?retryWrites=true&w=majority/testdatabase";
mongoose.connect(dburl, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true})
    .then( () => {
        console.log("connected to dabatase on fhuuka cluster");
    })
    .catch(() => {
        console.log("error connecting to database on fhuuka cluster");
    })

app.get("/", (req,res) => {
    res.send("Up and running!");
})
