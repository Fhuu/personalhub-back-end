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
    passport.authenticate('local', (err, user, info) => {
        if(!user) {
            req.session.loginStatus = false;
            console.log(req.session.loginStatus)
            res.json({
                "loginStatus" : "0"
            })
        } else {
            req.session.loginStatus = true;
            req.session.username = user.username;
            console.log(req.session.loginStatus, req.session.username)
            res.json({
                "loginStatus" : "1"
            });
        }
    })(req,res,next);
}

exports.checkSession = (req,res,next) => {
    loginStatus = req.session.loginStatus;
    console.log(loginStatus);
    username = req.session.username;
    console.log(username);
    res.json({
        "loginStatus" : loginStatus, 
        "username" : username
    });
}