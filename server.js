var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');
var connection = require('./config/connection');



var app = express();

//Express handlebars engine init
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use('/public', express.static(__dirname + "/public"));
app.use(session({
  secret: "this is a secret",
  cookie: {
    maxAge: 1000 * 60 * 5
  },
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var PORT = process.env.NODE_ENV || 3000;
connection.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on port: %s", PORT);
  });
});

//routes
var routes = require('./controllers/router.js');
app.use('/', routes);
