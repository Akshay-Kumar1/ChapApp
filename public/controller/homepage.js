//  ChatApp.controller('homeCntrl', function($scope, $http ,$state){
//     localStorage.getItem('token')
//     localStorage.getItem('userid')

//  })
ChatApp.controller('homeCntrl', function ($scope,$state,$http,$location,SocketService) {
    var mytoken =localStorage.getItem("token");
    var id=localStorage.getItem("userid");
    var username=localStorage.getItem("username");
    $scope.currUser=username;
    console.log("id is"+id)
       var msgArr=[];
       var arr=[];
       $scope.val =0;
    $http({
        method: 'GET',
        url: 'auth/users/'+id+'/list',
        headers:{
            'token': mytoken
        }
   }).then(function (response) {
    // for(var i=0;i<(response.data.message).length;i++){
    //     arr.push(response.data.message[i].name)
    arr = response.data.message;
    $scope.arr=arr;
    })
    $scope.person=function(userDetail){
        localStorage.setItem('rusername',userDetail.name);
        localStorage.setItem('ruserId',userDetail.userid);
        $state.go('singleChat');
    }
    // console.log(arr);

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
    $scope.navigate = function(username)
    {
        console.log(username);
        $scope.val =1; 
    }
        SocketService.on('tofrontend',function(msg){
            $scope.msgArr.push(msg)
        })    

    })
