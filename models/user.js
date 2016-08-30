// user.js---------------------------------------------------------------------
var mongoose             = require('mongoose');
var passortLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// adds methods from package to our user schema
userSchema.plugin(passortLocalMongoose);

module.exports = mongoose.model('User', userSchema);
