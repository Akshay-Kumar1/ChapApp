//var ChatApp=angular.module('loginController',[]);
ChatApp.controller('loginCntrl',function($scope, $http){
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
        console.log(response);
        console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log("successfull");
            $scope.message="login Successful";
        }
        else if(response.data.Success==false){
            $scope.message="login Unsuccessful"
        }
    })
    }
    
})