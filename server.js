// 'use strict'

var express = require('express');
var logger = require('morgan');
var request = require('request');

var bodyParser = require('body-parser');
// var db = require('./db/pg');
// var dotenv = require('dotenv');
// dotenv.load();
var app = express();
// app.use(morgan('combined'));
var path = require('path');
var methodOverride = require('method-override');

var burgerRoutes = require( path.join(__dirname, '/routes/burgers'));


// parse incoming forms
app.use(bodyParser.urlencoded({extended: false}));
app.use( bodyParser.json());

// override with POST having ?_method=XXXX
app.use(methodOverride('_method'));

//Setting Up Views
// app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

//log
app.use( logger('dev') );


/*ROUTES*/
// home route
app.get('/', (req,res)=>res.render('pages/home'))

// //Burgers
app.use('/burgers', burgerRoutes);






//Footer
var port = process.env.PORT || 3000;
    var server = app.listen(port);
