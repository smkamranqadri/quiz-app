/// <reference path="../../typings/tsd.d.ts" />
var userModel_1 = require('../models/userModel');
function creatUser(req, res) {
    var newUser = req.body;
    userModel_1.User.findOne({ userName: newUser.userName }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.userName === newUser.userName) {
            req.flash('signupMessage', 'User Already Exits!');
            res.redirect('/signup');
        }
        else {
            userModel_1.User.create(newUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect('/quiz');
                }
            });
        }
    });
}
exports.creatUser = creatUser;
function retriveUser(req, res) {
    var reqUser = req.body;
    userModel_1.User.findOne({ userName: reqUser.userName }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user === null) {
            req.flash('signinMessage', 'User Not Found!!');
            res.redirect('/signin');
        }
        else if (user.passWord === reqUser.passWord) {
            res.redirect('/quiz');
        }
        else {
            req.flash('signinMessage', 'Invalid Password!');
            res.redirect('/signin');
        }
    });
}
exports.retriveUser = retriveUser;
