angular.module('signupController', [])
	.controller('SignupCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.user_added = false;
		$scope.signup = function(){
			$scope.problem = '';
			// Test the username and password
			if($scope.username.length < 4) { // Username too short
				$scope.problem = 'Please enter a username with 4 or more characters.';
			} else if($scope.password.length < 6) {	// Password too short
				$scope.problem = 'Please enter a password with 6 or more characters.';
			} else { // No problems client-side
				// Send signup data to the server
				$http.post('/api/create-user', {
					username: $scope.username,
					password: $scope.password
				}).then(function(){
					// Success callback
					$scope.user_added = true;
				});
			}
		};
	}]);