/**
 * RoomController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  'list': function(req,res,next){
  	res.view();
  },

  'new': function(req,res){
  		res.view()
  },

  'update': function(req,res,next){
    var paramsAll = req.params.all();
    console.log(paramsAll);

    var msgData = { msg: paramsAll.msg, roomid: req.param('id'), usr: req.session.User };
    Room.findOne(req.param('id')).done(function(err,r){
      if(err) return console.log(err);
      console.log(r);

      r.msgs.push(msgData);
      console.log(r.msgs);

      Room.update(req.param('id'),{ msgs: r.msgs },function updateRoom(err){
        if (err) return console.log(err);
        if (!err){
          Room.publishUpdate(r.id,{msgs: r.msgs});
        }
      });

      res.send(r);
    
    });
    
  },

  // 'create': function(req,res,next){
  // 	Room.create(req.params.all(), function roomCreated(err,room){
  // 		if(err){ 
  // 			console.log(err); 
  // 			return res.redirect('/')
  // 		}
  // 		res.redirect('/room/show/' + room.id);
  // 	});
  // },

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
