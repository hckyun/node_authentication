// database.js

module.exports = {
	//url: 'mongodb://localhost/mywork'
	url: process.env.MONGODB_URI
};

// (in server.js)
// var configDB = require('./config/database.js');
// mongoose.connect(configDB.url);	// connect to our database
