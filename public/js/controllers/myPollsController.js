angular.module('myPollsController', [])
	.controller('MyPollsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.sharing = false;

		// Get user's polls from database/server
		$http.get('/api/get-polls')
			.then(function(response) { 	// Success
				$scope.polls = response.data;
			}, function() { 		// Failure

			});

		// Delete the poll from the database
		$scope.delete = function(index) {
			// TODO: Ask the user to confirm!
			$http.post('/api/delete-poll', {
				question: $scope.polls[index].question
			}).then(function() {	// Success
				//$scope.polls.splice(index, 1);
				console.log('Poll succesfully deleted from the database.');
				$location.path('/my-polls');
			}, function() {				// Failure
				console.log('An error occurred while trying to delete the poll.');
			});
		}

		// Display the sharing link
		$scope.share = function(index) {
			$scope.share_link = 'https://quick-vote.herokuapp.com/vote?id=' + $scope.polls[index]._id;
			$scope.sharing = true;
		}
	}]);