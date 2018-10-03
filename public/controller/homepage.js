//  ChatApp.controller('homeCntrl', function($scope, $http ,$state){
//     localStorage.getItem('token')
//     localStorage.getItem('userid')

//  })
ChatApp.controller('homeCntrl', function ($scope,$http,$location,SocketService) {
    var mytoken =localStorage.getItem("token");
    var id=localStorage.getItem("userid");
    var username=localStorage.getItem("username");
    $scope.currUser=username;
    console.log("id is"+id)
       var msgArr=[];
       var arr=[];
    $http({
        method: 'GET',
        url: 'auth/users/'+id+'/list',
        headers:{
            'token': mytoken
        }
   }).then(function (response) {
    for(var i=0;i<(response.data.message).length;i++){
        arr.push(response.data.message[i].name)
    }
    // console.log(arr);
})
    $scope.arr=arr;
    $scope.sendMessage = function () 
    {
        SocketService.emit('tobackend', { "userid": id, "message": $scope.message, "date": new Date(),"username":username},$scope.message=null)
    }
    $http({
        method: 'GET',
        url: '/auth/users/'+id+'/msgs',
        headers: {
            'token': mytoken
        }
    }).then(function (response) {
        for(var i=0;i<(response.data.message).length;i++)
        msgArr.push(response.data.message[i]);
        //nameArr.push(response.data.message[i].username);
    })
    $scope.msgArr=msgArr;
        $scope.logout=function () {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            $location.path('/login')
    
    }
        SocketService.on('tofrontend',function(msg){
            $scope.msgArr.push(msg)
        })    

    })
