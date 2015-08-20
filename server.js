//declaration
var express = require("express"),
    app     = express(),

    path    = require('path'),
	port    = process.env.port || 3000,

	api     = require('./routes/api');
//	auth    = require('./routes/auth');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes
app.use('/', api);
//app.get('/auth',auth);

//built-in middleware
app.use(express.static(path.join(__dirname, 'public')));

//listening port
app.listen(port);

//console logging
console.log('server running on port : ' + port + '...');
