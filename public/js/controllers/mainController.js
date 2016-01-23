angular.module('mainController', [])
	.controller('MainCtrl', ['$scope', '$http', '$route',function($scope, $http, $route) {
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
				$route.reload();
			});
		}

	}]);