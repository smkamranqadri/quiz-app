/// <reference path="../../typings/tsd.d.ts" />

import * as express          from "express";

import * as userController   from '../controllers/userController';

let router : express.Router = express.Router();

router.get('/', (req : express.Request, res : express.Response) => {
  res.render('index', {title : 'Quiz routerlication'});
});

router.get('/signup', (req : express.Request, res : express.Response) => {
  res.render('signup', {title : 'Sign Up', message : req.flash('signupMessage')});
});

router.get('/signin', (req : express.Request, res : express.Response) => {
  res.render('signin', {title : 'Sign In', message : req.flash('signinMessage')});
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
