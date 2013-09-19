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

  'index': function(req,res){
    Room.find(function foundRoom(err,rooms){
      if(err) return console.log(err);
      else { res.json({
          success: true,
          message: rooms
        });
      };
    });
  },

  'new': function(req,res){
  	res.view()
  },

  'update': function(req,res,next){
    // var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
    // var regEx = /<\w>|<\/\w>/g
    var paramsAll = req.params.all();

    var msgData = { 
      msg: paramsAll.msg.replace(/(<([^>]+)>)/ig,"<code>"), 
      tick: paramsAll.tick, 
      roomid: req.param('id'), 
      usr: req.session.User 
    };
    // var msgData = { msg: paramsAll.msg.replace(regEx,"scr_ipt"), roomid: req.param('id'), usr: req.session.User };
    
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

    var clients = Room.subscribers(req.param('id'));
    // Room.publish(req.socket, req.param('id'),{clients: clients});

    Room.findOne(req.param('id'), function foundRoom(err,room){
  		if(err) return console.log(err);
  		if(!room) return res.redirect('/');
      if(!err){
        // var clients = Room.subscribers(req.param('id'));
        console.log(clients);
        // Room.publishUpdate(req.param('id'),{clients: clients});

        res.view({
          room: room
        });
      }
  	});
  },

  'clients': function(req,res){
    var clients = Room.subscribers(req.param('id'));
    Room.publish(req,req.param('id'),{clients: clients});
  }

};
