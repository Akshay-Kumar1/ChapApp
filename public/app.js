var ChatApp= angular.module('ChatApp',['ui.router']);

ChatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Registration');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
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

});