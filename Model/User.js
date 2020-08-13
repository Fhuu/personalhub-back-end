const Mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const userSchema = Mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = Mongoose.model("user", userSchema);