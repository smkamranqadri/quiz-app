//declaration
var express = require("express"),
    app     = express(),

    path    = require('path'),
	session = require('express-session'),
	passport = require('passport'),
	
	port    = process.env.port || 3000,

	api     = require('./routes/api'),
	auth    = require('./routes/auth')(passport);

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//custom middleware
app.use(session({
  secret: 'thunder cat'
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', api);
app.use('/auth', auth);

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);


//built-in middleware
app.use(express.static(path.join(__dirname, 'public')));

//listening port
app.listen(port);

//console logging
console.log('server running on port : ' + port + '...');
