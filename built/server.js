/// <reference path="../typings/tsd.d.ts" />
//third party module import
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var session = require("express-session");
var flash = require("connect-flash");
//custom module import
var index = require('./routes/indexRoute');
//server configuration
var app = express();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/quiz-app');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//builtin middleware
app.use(express.static(path.join(__dirname, '../public')));
//third party middleware
app.use(morgan('dev'));
app.use(cookieParser('fulloffunwithcodingjsints'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'fulloffunwithcodingjsints' }));
app.use(flash());
//custom mounted middleware for routing
app.use('/', index);
//start server
app.listen(port, function () {
    console.log('Express started on Port : ' + port);
});
