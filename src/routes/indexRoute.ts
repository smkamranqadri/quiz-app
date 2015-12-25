/// <reference path="../../typings/tsd.d.ts" />

import * as express          from "express";

import * as userController   from '../controllers/userController';

let router : express.Router = express.Router();

// Checking User in Database from Session and Storing in Locals
router.use(userController.checkUser);

// Home
router.get('/', (req : express.Request, res : express.Response) => {
  res.render('index', {title : 'Quiz Application'});
});

// Signup
router.get('/signup', (req : express.Request, res : express.Response) => {
  res.render('signup', {title : 'Sign Up', message : req.flash('signupMessage')});
});

router.post('/signup', userController.creatUser);

// Signin
router.get('/signin', (req: express.Request, res: express.Response) => {
  res.render('signin', {title : 'Sign In', message : req.flash('signinMessage')});
});

router.post('/signin', userController.retriveUser);

// Signout
router.get('/signout', (req: express.Request, res: express.Response) => {
  req.session.destroy(()=>{});
  res.redirect('/');
});

// Quiz
router.get('/quiz', isLoggedIn, (req : express.Request, res : express.Response) => {
  res.render('quiz', { title: 'Quiz' };
});

// Custom Functions
function isLoggedIn(req : express.Request, res : express.Response, next : Function) {
  if (req.session['user']){
    return next();
  }
  res.redirect('/signin');
};

module.exports = router;
