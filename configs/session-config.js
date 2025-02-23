const sessionConfig = (app, sessionSecret, mongoose, dbURL) => {
    const session = require('express-session');
    //session needs session Store and memoryStore is not good for actual use because memory leaks happens
    const mongoStore = require("connect-mongo")(session);

    const sameSiteOption = ((process.env.NODE_ENV === 'production')) ? "none" : "lax";

    //create connection for express-session to store data into mongodb with help of mongoose
    mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : true, useCreateIndex : true})
    .then(() => {
        console.log("session connected to database on fhuuka cluster");
    })
    .catch((error) => {
        console.log("session error connecting to database on fhuuka cluster");
        console.log(error);
    });

    app.set('trust proxy', true);
    app.use(session({
        secret: sessionSecret,
        /*
         * defines where the data from session is being stored. 
         * autoRemove is to remove sessoion once it is expired. 
         * Can be done with interval, native by default.
         * ttl is the expiring time in seconds, it refreshes everytime client interacts with the server.
         */
        store: new mongoStore({
            mongooseConnection : mongoose.connection,
            ttl: 30 * 60
        }),
        //resave false means dont save anything to database if nothing change during the session
        resave: false,
        saveUninitialized : true,
        cookie : {
            secure : (process.env.NODE_ENV === 'production'),
            path : '/',
            maxAge: 100 * 60 * 30,
            httpOnly : true,
            sameSite : sameSiteOption
        }
    }))
    console.log("secure :", (process.env.NODE_ENV === 'production'), ", sameSite :", sameSiteOption);
}

module.exports = sessionConfig;