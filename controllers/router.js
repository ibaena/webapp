var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var Users = require('../models/user');


//get routes
router.get('/', function(req, res) {
  res.render('signup', {
    title: 'SocialPost'
  });
});

router.get('/login', function(req, res) {
  res.render('login', {
    title: 'SocialPost',
  });
});

router.get('/signup', function(req, res) {
  res.render('confirm', {
    title: 'SocialPost',
  });
});


//post
router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  Users.findOne({
    where: {
      email: email,
    }
  }).then(function(user) {
    bcrypt.compare(password, user.dataValues.password, function(err, results) {
      console.log("Results are " + results);
      if (results) {
        req.session.authenticated = user;
        res.redirect('/students');
      } else {
        res.redirect('/signup');
      }
    });
  }).catch(function(err) {
    throw err;
  });
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      Users.create({
        email: req.body.email,
        verified: req.body.student,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      }).then(function(task) {
        task.save();
      });
      res.redirect('/signup');
      console.log('it WOrked');
    });
  });
});


module.exports = router;
