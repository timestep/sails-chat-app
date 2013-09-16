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

	'process': function(res,req){
		passport.authenticate('local', function (err,usr,info){
			if ((err)||(!usr)){
				return res.send({
					message: 'Login Fail'
				});
				res.send(err);
			}
			req.logIn(usr, function(err){
				if(err) res.send(err);
				return res.send({
					message: 'Login Successful'
				});
			});
		})(req,res);
	},

	'logout': function(res,req){
		req.logout();
		res.send('Logout Successful');
	}
  

};
