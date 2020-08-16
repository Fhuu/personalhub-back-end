const app = require("./app");
const port = process.env.PORT || 3001;

//----------------Server setup-----------------//
app.listen(port, () => {
    console.log(port)
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})

module.exports = app;