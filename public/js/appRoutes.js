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
            controller : 'SignupCtrl'
        })
        // Log in page
        .when('/login', {
            templateUrl: 'views/login.html',
            controller : 'LoginCtrl' 
        })
        // Create Poll page
        .when('/create-poll', {
            templateUrl: 'views/createPoll.html',
            controller : 'CreatePollCtrl'
        })
        // My Polls page
        .when('/my-polls', {
            templateUrl: 'views/myPolls.html',
            controller : 'MyPollsCtrl'
        })
        // Specific poll as owner
        .when('/my-poll', {
            templateUrl: 'views/myPoll.html',
            controller:  'MyPollCtrl'
        })
        // Vote page
        .when('/vote', {
            templateUrl: 'views/vote.html',
            controller : 'VoteCtrl'
        });

    $locationProvider.html5Mode(true);
}]);