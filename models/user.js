var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// create schema
var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
