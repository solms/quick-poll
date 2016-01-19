angular.module('myPollController', [])
	.controller('MyPollCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
		$http.post('/api/poll', { id: $location.search().id })
			.then(function(response) {	// Success
				// Make the poll data available to the front-end
				$scope.poll = response.data;
				// Calculate the total amount of votes cast
				$scope.poll.total_votes = 0;
				for(var i=0; i<$scope.poll.votes.length; i++) {
					$scope.poll.total_votes += $scope.poll.votes[i];
				}
			}, function(response) {		// Failure
				$scope.problem = 'Could not load the poll data from the server :(';
			})
	}]);