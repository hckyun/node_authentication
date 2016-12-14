// database.js

module.exports = {
	url: 'mongodb://localhost/mywork'
};

// (in server.js)
// var configDB = require('./config/database.js');
// mongoose.connect(configDB.url);	// connect to our database