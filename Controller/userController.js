const model = require("../Model/User");
const passport = require("passport");

exports.try = (req,res,next) => {
    console.log("user Router and controller mounted");
    res.send("done");
    next();
}

exports.create = (req,res,next) => {
    user = new model({
        username : req.body.username,
        email : req.body.email
    });
    model.register(user, req.body.password, (err,document) => {
        if(err) return err;
        next();
    })
}

exports.authenticate = (req,res,next) => {
    passport.authenticate('local')(req,res,next);
}

exports.checkSession = (req,res,next) => {
    res.json({
        "loginStatus" : req.isAuthenticated(), 
        "username" : req.user.username
    });    
}

exports.isLoggedIn = (req,res,next) => {
    res.json({
        "loginStatus" : req.isAuthenticated()
    })
}