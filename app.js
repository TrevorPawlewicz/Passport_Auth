// MODULES---------------------------------------------------------------------
var express              = require('express');
var mongoose             = require('mongoose');
var passport             = require('passport');
var bodyParser           = require('body-parser');
var LocalStrategy        = require('passport-local');
var passortLocalMongoose = require('passport-local-mongoose');
//
var User                 = require('./models/user.js');
var app                  = express();

mongoose.connect('mongodb://localhost/passport_auth_app');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); // needed when using a form

app.use(require('express-session')({
    secret: 'One for the money and two for the road',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // 1) required for PASSPORT use
app.use(passport.session());   // 2) required for PASSPORT use

// methods that come with PASSPORT we added to our schema in user.js:
passport.use(new LocalStrategy(User.authenticate())); // auth method
passport.serializeUser(User.serializeUser()); // re-encrypts our data
passport.deserializeUser(User.deserializeUser()); // decrypts our data

//=============================================================================
// ROUTES:
app.get('/', function(req, res){
    res.render('home.ejs');
});
//                 MIDDLEWARE
app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret.ejs');
});

// AUTH Routes: ---------------------------------------------------------------
// sign up form
app.get('/register', function(req, res){
    res.render('register.ejs');
});
// handle user sign up
app.post('/register', function(req, res){

    req.body.username; // info taken from "name" of form in register.ejs
    req.body.passowrd; // info taken from "name" of form in register.ejs
    //                           user we want to create
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log("There has been an error:");
            console.log(err);
            return res.render('register');
        }

        // passport-local-mongoose auth:
        passport.authenticate('local')(req, res, function(){
            res.redirect('/secret');
        });
    });
});

// LOGIN Routes: --------------------------------------------------------------
// render the login form
app.get('/login', function(req, res){
    res.render('login.ejs');
});

// login logic using passport MIDDLEWARE
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
    }), function(req, res){
        if (err) {
            console.log(err);
        } else {

        }
});

// logout
app.get('/logout', function(req, res){
    req.logout(); // passport method destoys ALL user data
    res.redirect('/');
});


// our MIDDLEWARE
function isLoggedIn(req, res, next){
    //      passport method
    if (req.isAuthenticated()) {
        return next(); // keep going
    }

    res.redirect('/login');
};











//-----------------------------------------------------------------------------
app.listen(3000, function(){
    console.log("...Passport app server has started!");
});
//-----------------------------------------------------------------------------
