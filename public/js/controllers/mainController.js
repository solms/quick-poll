angular.module('mainController', [])
	.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
		// Determine whether a user is logged in
		$http.get('/api/auth').success(function(response) {
			$scope.authenticated 	= response.authenticated;
			if(response.active_user) { // Try to get the name of the active user
				$scope.active_user 	= response.active_user.name;
			}
		});

	}]);