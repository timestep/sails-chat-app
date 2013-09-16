/**
 * RoomController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  'index': function(req,res,next){
  	Room.find( function foundRooms(err,rooms){
  		if(err) return console.log(err);
  		else { res.json( rooms ); }
  	});
  },

  'list': function(req,res,next){
  	res.view();
  },

  'new': function(req,res){
  		res.view()
  },

  'create': function(req,res,next){
  	Room.create(req.params.all(), function roomCreated(err,room){
  		if(err){ 
  			console.log(err); 
  			return res.redirect('/')
  		}
  		res.redirect('/room/show/' + room.id);
  	});
  },

  'show': function(req,res){
  	Room.findOne(req.param('id'), function foundRoom(err,room){
  		if(err) return console.log(err);
  		if(!room) return res.redirect('/');
  		res.view({
  			room: room
  		});
  	});
  },

};
