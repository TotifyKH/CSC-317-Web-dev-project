var express = require('express');
var router = express.Router();
var isLoggedIn = require("../middleware/routeprotectors").userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Kimheng Peng" });
});

router.get('/home', getRecentPosts, function(req, res, next){
  res.render('index', {title: 'Home Page'});
});

router.get('/register', function(req, res, next){
  res.render('registration',{title: 'Registration Page'});
});

router.get('/login', function(req, res, next){
  res.render('login',{title: 'Login Page'});
});

router.use('/postimage', isLoggedIn);

router.get('/postimage', function(req, res, next){
  res.render('postimage',{title: 'Postimage Page'});
});

router.get('/viewpost', function(req, res, next){
  res.render('viewpost',{title: 'Viewpost Page'});
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
      res.render('viewpost', {title: `Post ${req.params.id}`});
});

module.exports = router;
