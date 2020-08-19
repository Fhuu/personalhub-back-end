const sessionConfig = (app, mongoose, dbURL) => {
    const session = require('express-session');
    //session needs session Store and memoryStore is not good for actual use because memory leaks happens
    const mongoStore = require("connect-mongo")(session);

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
        secret: 'secret',
        /*
         * defines where the data from session is being stored. 
         * autoRemove is to remove sessoion once it is expired. 
         * Can be done with interval, native by default.
         * ttl is the expiring time in seconds, it refreshes everytime client interacts with the server.
         */
        store: new mongoStore({
            mongooseConnection : mongoose.connection,
            ttl: 20 * 60
        }),
        //resave false means dont save anything to database if nothing change during the session
        resave: false,
        saveUninitialized : true,
        cookie : {
            path : '/',
            secure : true,
            maxAge: 360000
        }
    }))
}

module.exports = sessionConfig;