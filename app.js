// MODULES---------------------------------------------------------------------
var express              = require('express');
var mongoose             = require('mongoose');
var passport             = require('passport');
var bodyParser           = require('body-parser');
var localStrategy        = require('passport-local');
var passortLocalMongoose = require('passport-local-mongoose');
//
var User                 = require('./models/user.js');
var app                  = express();

mongoose.connect('mongodb://localhost/passport_auth_app');
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: 'One for the money and two for the road',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // 1) required for PASSPORT use
app.use(passport.session());   // 2) required for PASSPORT use

// 2 methods that come with PASSPORT we added to our schema in user.js:
passport.serializeUser(User.serializeUser()); // re-encrypts our data
passport.deserializeUser(User.deserializeUser()); // decrypts our data

app.get('/', function(req, res){
    res.render('home.ejs');
});

app.get('/secret', function(req, res){
    res.render('secret.ejs');
});




























//-----------------------------------------------------------------------------
app.listen(3000, function(){
    console.log("...Passport app server has started!");
});
//-----------------------------------------------------------------------------
