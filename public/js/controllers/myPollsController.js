angular.module('myPollsController', [])
	.controller('MyPollsCtrl', ['$scope', '$http', function($scope, $http) {
		// Get user's polls from database/server
		$http.get('/api/get-polls')
			.then(function(response) { 	// Success
				$scope.polls = response.data;
			}, function() { 		// Failure

			});

		// View the details for clicked poll
		$scope.viewPoll = function(index) {
			console.log('You want to view ' + $scope.polls[index].question);
		}
	}]);