// config/auth.js

// This file will hold all our client secret keys (facebook, twitter, google...)

module.exports = {

	'facebookAuth' : {
		'clientID': 'your consumer key here',
		'clientSecret': 'your client secret here',
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'clientID': 'your consumer key here',
		'clientSecret': 'your client secret here',
		'callbackURL': 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID': 'your consumer key here',
		'clientSecret': 'your client secret here',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	},

	// template
	'sampleAuth' : {
		'clientID': 'your consumer key here',
		'clientSecret': 'your client secret here',
		'callbackURL': 'http://localhost:8080/auth/sample/callback'
	},	
};