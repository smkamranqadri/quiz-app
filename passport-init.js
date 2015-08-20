var //User 			= require('./models/models'),
	//mongoose 		= require('mongoose'),
	//User			= mongoose.model('User'),
	LocalStrategy   = require('passport-local').Strategy,
	bCrypt 			= require('bcrypt-nodejs');

//temporary data store
var users = {};

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
    	done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        return done(null, users[username]);
    });

    passport.use('signin', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            if(users[username]){
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }
            if(isValidPassword(users[username], password)){
                //sucessfully authenticated
                return done(null, users[username]);
            }
            else{
                console.log('Invalid password '+username);
                return done(null, false)
            }
			
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
			
			if(users[username]){
				console.log('User already exits with username: ' + username);
				return done(null, false);
			}
			users[username] = {
				username: username,
				password: createHash(password)
			}
			console.log(users[username].username + ' Registration successful');
            return done(null, users[username]);

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};