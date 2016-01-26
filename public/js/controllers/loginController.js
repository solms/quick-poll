angular.module('loginController', [])
	.controller('LoginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.problem = '';
		$scope.login = function() {
			// Try to log in
			$http.post('/login', {
				username: $scope.username,
				password: $scope.password
			}).then(function() { // Success
				// Use window.location to force the ENTIRE page to reload (header too)
				$location.path('/');
				window.location = '/';
      			window.location.reload();
			}, function() {
				// Failure
				$scope.problem = 'The credentials provided do not match, or do not exist.';
			});
		};
	}]);