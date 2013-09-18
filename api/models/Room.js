/**
 * Room
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  schema:true,

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	msgs: {
  		type: 'array',
  		defaultsTo: []
  	}
    
  }

};
