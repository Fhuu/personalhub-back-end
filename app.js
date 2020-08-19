const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URI || ((process.env.NODE_ENV === 'test') ? 'mongodb://localhost:27017/yuk' : "mongodb://localhost:27017/yuk");


//----------------body parser-----------------//
const bodyparser = require("body-parser");
app.use(bodyparser.json());

//------------------Session setup------------------//
const sessionConfig = require("./configs/session-config");
sessionConfig(app, mongoose, dbURL);

//---------------------Cors on expressjs---------------------------//
//source https://enable-cors.org/server_expressjs.html
const cors = require("cors");
app.use(cors());

//----------------------Database---------------------------//
const dbConfig = require("./configs/db-config");
dbConfig(mongoose, dbURL);

//------------------------Passport-------------------------//
const passportConfig = require("./configs/passport-config");
passportConfig(app);

//---------------------------Routes--------------------------//
const userRoutes = require("./Routes/UserRoutes");
app.use('/user', userRoutes);

module.exports = app;