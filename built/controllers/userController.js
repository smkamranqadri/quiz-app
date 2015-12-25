/// <reference path="../../typings/tsd.d.ts" />
var userModel_1 = require('../models/userModel');
function creatUser(req, res) {
    var newUser = req.body;
    userModel_1.User.findOne({ userName: newUser.userName }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user === null) {
            userModel_1.User.create(newUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect('/quiz');
                }
            });
        }
        else if (user.userName === newUser.userName) {
            req.flash('signupMessage', 'User Already Exits!');
            res.redirect('/signup');
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
            req.session['user'] = reqUser.userName;
            res.redirect('/quiz');
        }
        else {
            req.flash('signinMessage', 'Invalid Password!');
            res.redirect('/signin');
        }
    });
}
exports.retriveUser = retriveUser;
function checkUser(req, res, next) {
    if (req.session && req.session['user']) {
        userModel_1.User.findOne({ userName: req.session['user'] }, function (err, user) {
            if (user) {
                res.locals.user = user.userName;
            }
            else {
                req.session.destroy(function () { });
            }
            next();
        });
    }
    else {
        next();
    }
}
exports.checkUser = checkUser;
