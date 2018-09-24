var ChatApp= angular.module('ChatApp', ['ui.router','registerController','loginController']);

ChatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Registration');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('Registration', {
            url: '/Registration',
            templateUrl: 'template/Registration.html',
            controller : 'registerCntrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'template/Login.html',
            controller : 'loginCntrl'
        })

});