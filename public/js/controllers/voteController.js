angular.module('voteController', [])
	.controller('VoteCtrl', ['$http', '$scope', function($http, $scope) {
		$scope.poll_retrieved = false;
		var selected_option = '';

		$scope.goVote = function() {
			if($scope.poll_id == '' || $scope.poll_id == undefined) {
				$scope.problem = 'Please enter a valid poll ID!';
			} else {
				// Try to get the poll
				$http.post('/api/poll', {
					id: $scope.poll_id
				}).then(function(response) {	// Successfully retrieved the poll
					console.log('Successfully retrieved poll.');
					$scope.poll_retrieved = true;
					$scope.poll = response.data;
				}, function(response) {				// Could not retrieve the poll
					console.log(response.data);
				});
			}
		};

		// Set the selected option to vote for
		$scope.setVote = function(option) {
			selected_option = option;
		}

		// Add vote to the database
		$scope.submitVote = function() {
			console.log('You want to vote for ' + selected_option);
			$http.post('/api/submit-vote', {
				poll_id: $scope.poll_id,
				option : selected_option
			}).success(function(data) {
				console.log('You have successfully cast your vote.');
			}).error(function(err, data) {
				console.log(data);
			});
		}
	}]);