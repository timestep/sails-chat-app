var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

module.exports = {
	express: {
		customMiddleWare: function (app){
			console.log('Express MiddleWare for Passport');
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}
};