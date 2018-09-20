var routerApp = angular.module('ChatApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider

        .state('Registration', {
            url: '/Registration',
            templateUrl: 'template/Registration.html'
        })
        .state('Login', {
            url: '/Login',
            templateUrl: 'template/Login.html'
        })
});