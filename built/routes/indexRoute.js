/// <reference path="../../typings/tsd.d.ts" />
var express = require("express");
var userController = require('../controllers/userController');
var router = express.Router();
// Checking User in Database from Session and Storing in Locals
router.use(userController.checkUser);
// Home
router.get('/', function (req, res) {
    res.render('index', { title: 'Quiz Application' });
});
// Signup
router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Sign Up', message: req.flash('signupMessage') });
});
router.post('/signup', userController.creatUser);
// Signin
router.get('/signin', function (req, res) {
    res.render('signin', { title: 'Sign In', message: req.flash('signinMessage') });
});
router.post('/signin', userController.retriveUser);
// Signout
router.get('/signout', function (req, res) {
    req.session.destroy(function () { });
    res.redirect('/');
});
// Quiz
router.get('/quiz', isLoggedIn, function (req, res) {
    res.render('quiz', { title: 'Quiz' });
});
// Custom Functions
function isLoggedIn(req, res, next) {
    if (req.session['user']) {
        return next();
    }
    res.redirect('/signin');
}
;
module.exports = router;
