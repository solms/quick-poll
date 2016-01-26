angular.module('mainController', [])
	.controller('MainCtrl', ['$scope', '$http', '$location',function($scope, $http, $location) {
		// Determine whether a user is logged in
		$http.get('/api/auth').success(function(response) {
			$scope.authenticated 	= response.authenticated;
			if(response.active_user) { // Try to get the name of the active user
				$scope.active_user 	= response.active_user.name;
			}
		});

		// Log the user out and refresh home screen
		$scope.logout = function() {
			$http.get('/logout').success(function(response) {
				// Use window.location to force the ENTIRE page to reload (header too)
				$location.path('/');
				window.location = '/';
      			window.location.reload();
			});
		}

	}]);