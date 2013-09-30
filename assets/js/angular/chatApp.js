var chatApp = angular.module('chatApp',['btford.socket-io']);

chatApp.config(function ($routeProvider){
	$routeProvider
		.when('/',
			{
				templateUrl:"/templates/home.html",
				controller:"RoomsCtrl"
			})
		.when('/room/:roomID',
			{
				templateUrl:"/templates/show.html",
				controller:"RoomCtrl"
			})
		.otherwise(
			{
				redirectTo:'/'
			})
});


chatApp.factory('roomsService', function($http) {
 	return {
		getRooms: function() {
	   //return the promise directly.
	   return $http.get('/room')
		   .then(function(result) {
		        //resolve the promise as the data
		        // debugger;
		      return result.data.message;
		    });
		},

		createRoom: function(data){
			return socket.post('/room/create', {
				name:data
			})
		}
	}
});


chatApp.factory('roomService', function($http) {
	return {
		getRoom: function(id) {
		 //return the promise directly.
		 return $http.get('/room/'+id)
		   .then(function(result) {
		        //resolve the promise as the data
		        // debugger;
		      return result.data;
		    });
		},

		// getSocket: function(id){
		// 	//// NEED TO SEND A PROMISE
		// 	return socket.get('/room/'+id)
		// 		.then(function (res){
		// 			// debugger;
		// 			return res;
		// 		});
		// },

		postMessage: function(message,roomID) {

			now = new Date().getTime();

			return socket.post('/room/update/'+ roomID,{
				msg: message,
				tick: now
			});
		}
	}
});


chatApp.controller("RoomsCtrl", function ($scope,roomsService){

	var rooms;
 //  $scope.rooms = roomsService.getRooms();

  socket.get('/room', function (res){
  	// debugger;
		rooms = res.message;
		$scope.rooms = res.message
		$scope.$apply()
		// debugger;
	});

  socket.on('message',function	(res){
  	// debugger;
		rooms.push(res.data);
		$scope.rooms = rooms
		$scope.$apply()
	})


  $scope.createRoom = function(){
  	var newRoom;

  	newRoom = $scope.newRoom.trim();

  	if(!newRoom.length) return;

  	roomsService.createRoom(newRoom);

  	$scope.newRoom = '';

  }



});

chatApp.controller("RoomCtrl", function ($scope, $route, $routeParams, roomService){

	var roomID = $routeParams.roomID

	// var socketData = roomService.getSocket(roomID)

	var roomData

	// function getSocketData (id){
	// 	socket.get('/room/'+id ,function (res){
	// 		return res;
	// 	});
	// }
	socket.get('/room/'+roomID, function (res){
		roomData = res;
		$scope.roomData = res
		$scope.$apply()
		// debugger;
	});

	socket.on('message',function	(res){
		roomData = res;
		$scope.roomData = res.data
		$scope.$apply()
	})


	var newMessage;

	// socket.forward('message', $scope);
 //  $scope.$on('socket:message', function (ev, data) {
 //     $scope.theData = data;
 //  });
 //  $scope.message = "YOLO"

  // $scope.roomData = socketData
  // $scope.roomData = roomData

  $scope.addMessage = function(){
  	newMessage = $scope.newMessage.trim();
  	if(!newMessage.length) return;
  	roomService.postMessage(newMessage,roomID);
  	$scope.newMessage = '';
  }


});



