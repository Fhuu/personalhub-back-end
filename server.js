const server = require("./app");
const port = process.env.PORT || 3000;

//----------------Server setup-----------------//
app.listen(port, () => {
    console.log("up and running!");
})

app.get("/", (req,res) => {
    res.send("Up and running!");
})

module.exports = server;