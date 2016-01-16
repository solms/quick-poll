// Provide the templates and controllers for each page
angular.module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // Home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })
        // Sign up page
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
        })
        // Log in page
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl' 
        });
        /*
        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        });*/

    $locationProvider.html5Mode(true);
}]);