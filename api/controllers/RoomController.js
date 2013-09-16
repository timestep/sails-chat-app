/**
 * RoomController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function(req,res,next){
  	Room.find( function foundRooms(err,rooms){
  		if(err) return console.log(err);
  		else { res.send(rooms) }
  	})
  }

};
