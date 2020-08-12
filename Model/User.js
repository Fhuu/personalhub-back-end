const Mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const userSchema = Mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField : "username"
});

module.exports = Mongoose.model("user", userSchema);