const passportConfig = (app) => {
    const User = require("../Model/User");
    const passport = require("passport");
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = passportConfig;