/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var passport = require('passport');

module.exports = {
	'login': function (req,res){
		res.view();
	},

	'process': function(req,res){
		passport.authenticate('local', function (err,usr,info){
			if ((err)||(!usr)){
				res.redirect('/login');
				return;
			}
			req.logIn(usr, function(err){
				if(err) res.send(err);
				res.redirect('/');
				return;
			});
		})(req,res);
	},

	'logout': function(req,res){
		req.logout();
		res.send('Logout Successful');
	}
  

};
