var ChatApp= angular.module('ChatApp',['ui.router','btford.socket-io']);

ChatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/registration');

    $stateProvider

        .state('registration', {
            url: '/registration',
            templateUrl: 'template/registration.html',
            controller : 'registerCntrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller : 'loginCntrl'
        })
        .state('homepage', {
            url: '/homepage',
            templateUrl : 'template/homepage.html',
            controller : 'homeCntrl'
        })

})

ChatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);