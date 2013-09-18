/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var bcrypt = require('bcrypt');


module.exports = {

	schema:true,

  attributes: {
  	username:{
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	password:{
  		type: 'string',
  		required: true
  	},
    admin:{
      type: 'boolean',
      defaultsTo: false
    },

  	toJSON: function() {
  		var obj = this.toObject();
  		delete obj.password;
  		return obj;
  	}
  },

  beforeCreate: function (usr, cb){
  	bcrypt.genSalt(10, function (err, salt){
  		bcrypt.hash(usr.password, salt, function  (err, hash) {
  			if(err){
  				console.log(err);
  				cb(err);
  			} else {
  				usr.password = hash;
  				cb(null, usr);
  			}
  		});
  	});
  }
};
