/// <reference path="../../typings/tsd.d.ts" />
var express = require("express");
var userController = require('../controllers/userController');
var router = express.Router();
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz routerlication' });
});
router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Sign Up', message: req.flash('signupMessage') });
});
router.get('/signin', function (req, res) {
    res.render('signin', { title: 'Sign In', message: req.flash('signinMessage') });
});
router.post('/signup', userController.creatUser);
router.post('/signin', userController.retriveUser);
/*
router.get('/quiz', isLoggedIn, (req : express.Request, res : express.Response) => {
  res.render('quiz', {
    title : 'Quiz',
    user : req.user
  });
});

router.get('/signout', (req : express.Request, res : express.Response) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req : express.Request, res : express.Response, next : Function) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};
*/
module.exports = router;
