//var ChatApp=angular.module('loginController',[]);
ChatApp.controller('loginCntrl',function($scope, $http, $state){
    console.log('login');
    $scope.user={
       
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function(){
        console.log("login calling", $scope.user);
    $http({
        method: 'POST',
        url: '/login',
        data: $scope.user
    }).then(function(response){
        // console.log(response);
        // console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log(response.data.message);
            $scope.message="Login Successful";
            $state.go('Homepage')
        }
        else if(response.data.Success==true){
            $scope.message="Login Unsuccessful"
        }
    },function(response){
        console.log(response)
        $scope.message=response.data.message
    })
    }
    
})