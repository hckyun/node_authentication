// routes.js

// (in server.js)
// require('./app/routes.js')(app, passport);

module.exports = function(app, passport) {

	// home page (with login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');	// load the index.ejs file
	});

	// login page - show login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	// process login
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true		// allow flash message
	}));

	// signup page
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	// process signup
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true		// allow flash message
	}));
	// app.post('/signup', function(req, res) {
	// 	console.log(req.body);		
	// });

	// profile page (after logged in)
	// we want this protected so you have to be logged in to visit
	// we will use route middleware to verify this
	app.get('/profile', isLoggedin, function(req, res) {
		res.render('profile.ejs', {
			user: req.user	// get the user out of session and pass to template
		});
	});

	// logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to check a user is logged in
function isLoggedin(req, res, next) {

	// if user is authenticated in the session, ...
	if (req.isAuthenticated()) {
		return next();	
	}

	res.redirect('/');
}