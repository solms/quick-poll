angular.module('loginController', [])
	.controller('LoginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.problem = '';
		$scope.login = function() {
			// Try to log in
			$http.post('/login', {
				username: $scope.username,
				password: $scope.password
			}).then(function() { // Success
				// Redirect to home page
				$location.path('/');
			}, function() {
				// Failure
				$scope.problem = 'The credentials provided do not match, or do not exist.';
			});
		};
	}]);