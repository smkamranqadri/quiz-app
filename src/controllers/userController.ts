/// <reference path="../../typings/tsd.d.ts" />

import * as express          from "express";
import * as mongoose         from "mongoose";

import {User, IUser}         from '../models/userModel';

export function creatUser (req : express.Request, res : express.Response) {
	let newUser : IUser = req.body;
	User.findOne({ userName: newUser.userName }, (err : Error, user : IUser) => {
        if (err) {
            res.send(err);
		} else if (user === null) {
			User.create(newUser, (err: Error) => {
				if (err) {
					res.send(err);
				} else {
					res.redirect('/quiz');
				}
			});
		} else if (user.userName === newUser.userName) {
			req.flash('signupMessage', 'User Already Exits!');
            res.redirect('/signup');			
		} 
    });
}

export function retriveUser (req : express.Request, res : express.Response) {
	let reqUser : IUser = req.body;
    User.findOne({ userName: reqUser.userName }, (err : Error, user : IUser) => {
        if (err) {
            res.send(err);
        } else if (user === null) {
            req.flash('signinMessage', 'User Not Found!!');
            res.redirect('/signin');
        } else if (user.passWord === reqUser.passWord) {
            req.session['user'] = reqUser.userName;
            res.redirect('/quiz');
        } else {
			req.flash('signinMessage', 'Invalid Password!');
            res.redirect('/signin');			
		}
    });
}

export function checkUser(req: express.Request, res: express.Response, next: Function) {
	if (req.session && req.session['user']) {
		User.findOne({ userName: req.session['user'] }, (err: Error, user: IUser) => {
			if (user) {
				res.locals.user = user.userName;
			} else {
				req.session.destroy(() => { });
			}
			next();
		});
	} else {
		next();
	} 
}