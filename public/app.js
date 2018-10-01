var ChatApp= angular.module('ChatApp',['ui.router','btford.socket-io']);

ChatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Registration');

    $stateProvider

        .state('Registration', {
            url: '/Registration',
            templateUrl: 'template/Registration.html',
            controller : 'registerCntrl'
        })
        .state('Login', {
            url: '/Login',
            templateUrl: 'template/Login.html',
            controller : 'loginCntrl'
        })
        .state('Homepage', {
            url: '/Homepage',
            templateUrl : 'template/Homepage.html',
            controller : 'homeCntrl'
        })

})

ChatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);