const express = require("express");
const app = express();
app.listen(3000, () => {
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})
