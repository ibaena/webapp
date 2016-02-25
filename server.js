var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

//Express handlebars engine init
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static(__dirname + "/public"));
app.use(session({
  secret: "this is a secret",
  cookie: {
    maxAge: 1000 * 60 * 5
  },
  saveUninitialized: true,
  resave: false
}));

var PORT = process.env.NODE_ENV || 8000;
app.listen(PORT, function() {
  console.log("Listening on port: %s", PORT);
});


app.get('/',function(req, res){
  res.render('index',{
    title: 'My Page'
  });
});
