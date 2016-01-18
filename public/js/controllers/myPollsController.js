angular.module('myPollsController', [])
	.controller('MyPollsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		// Get user's polls from database/server
		$http.get('/api/get-polls')
			.then(function(response) { 	// Success
				$scope.polls = response.data;
			}, function() { 		// Failure

			});

		// View the details for clicked poll
		$scope.viewPoll = function(index) {
			console.log('You want to view ' + $scope.polls[index].question);
		};

		// Delete the poll from the database
		$scope.delete = function(index) {
			// TODO: Ask the user to confirm!
			$http.post('/api/delete-poll', {
				question: $scope.polls[index].question
			}).then(function() {	// Success
				$scope.polls.splice(index, 1);
				console.log('Poll succesfully deleted from the database.');
			}, function() {				// Failure
				console.log('An error occurred while trying to delete the poll.');
			});
		}
	}]);