/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

	'new': function(req,res){
		res.view();
	},

	'create': function(req, res, next) {
    User.create( req.params.all(), function userCreated( err, usr ){
      if(err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
      	
      	return res.redirect('/user/new');
      }

      req.session.authenticated = true;
      req.session.User = usr;

      res.redirect('/user/show/'+usr.id);
    });
	},

};
