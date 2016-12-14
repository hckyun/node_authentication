// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../app/models/user');

module.exports = function(passport) {

	// passport session setup
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// local sign up
	// make named strategy, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {	// verify callback
		
		//process.nextTick(function() {
			User.findOne({'local.email' : email}, function(err, user) {			
				if (err) return done(err);

				// check to see if there  already exists a user with that email.
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));				
				}
				else {
					//create the user
					var newUser = new User();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					// save the user
					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		//})
	}));

	// local login
	// make named strategy, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {	// verify callback
		
		//process.nextTick(function() {
			User.findOne({'local.email' : email}, function(err, user) {			
				if (err) return done(err);

				// check to see if there  already exists a user with that email.
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'No user found.'));				
				}

				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Oooos! Wrong password.'));				
				}
				
				return done(null, user);
			});
		//})
	}));

};