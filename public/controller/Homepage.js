//  ChatApp.controller('homeCntrl', function($scope, $http ,$state){
//     localStorage.getItem('token')
//     localStorage.getItem('userid')

//  })
ChatApp.controller('homeCntrl', function ($scope,$http) {
    var mytoken =localStorage.getItem("token");
    var id=localStorage.getItem("userid");
    console.log("id is"+id)
       var arr=[];
    $http({
        method: 'GET',
        url: 'auth/users/'+id+'/list',
        headers:{
            'token': mytoken
        }
    }).then(function (response) {
        console.log(response.data.message)
        for(var i=0;i<(response.data.message).length;i++){
            arr.push(response.data.message[i].name)
        }
        // console.log(arr);
    })
        $scope.arr = arr;
        $scope.logout=function () {
            localStorage.removeItem(token);
            localStorage.removeItem(userid);
            $location.path('/login')
    
        }
        var socket = io.connect('http://localhost:4000');
    })