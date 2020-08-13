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
        res.send(document);
    })
}

exports.authenticate = (req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if(!user) {
            res.json({
                "loginStatus" : "0",
                "userId" : null
            })
            return;
        } else {
            res.json({
                "loginStatus" : "1",
                "userId" : user._id
            });
        }
    })(req,res,next);
}