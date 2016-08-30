var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/passport_auth_app');


app.set('view engine', 'ejs');



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
