/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var bcrypt = require('bcrypt');

module.exports = {

	'login': function (req,res){
		res.view();
	},

	'create': function(req,res){
		if(!req.param('username') || !req.param('password')) {
      var usernamePasswordRequiredError = 
        [{name: 'usernamePasswordrequired', message: 'You must enter username and passwor'}];
      req.session.flash = {
        err: usernamePasswordRequiredError
      }

      res.redirect('/session/login');
      return;
    }

    User.findOneByUsername(req.param('username'), function (err,user){
      if(err) return next(err);

      if(!user){
        var noAccountError = 
          [{ name: 'noAccount', message: 'The Email Address' + req.param('email') + ' not found.'}]
        req.session.flash = {
          err: noAccountError
        }

        res.redirect('/session/new');
        return;
	    }
      
      bcrypt.compare(req.param('password'), user.password, function(err, valid){
        if(err) return console.log(err);

        if(!valid){
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combo'}]
          req.session.flash = {
            err:  usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }
        
        req.session.authenticated = true;
        req.session.User = user;


        if(req.session.User.admin){
          res.redirect('/user');
          return;
        }

        console.log(req.session);
        res.redirect('/room/list');
      });
    });
	},

	'destroy': function(req,res){
		req.session.destroy();
		res.redirect('/');
	}
};
