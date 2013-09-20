function RoomListCtrl($scope, socket) {
  socket.request('/room', function(data){
  	console.log(data);
  	if(data.success == true){
	  	$scope.rooms = data.message
  	}
  })
}
