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

exports.checkLogin = (req,res,next) => {
    if(req.user) {
        res.json({
            "loginStatus" : true, 
            "username" : req.user.username
        }); 
    } else {
        res.json({
            "loginStatus" : false
        })
    }
       
}