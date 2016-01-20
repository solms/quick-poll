angular.module('createPollController', [])
	.controller('CreatePollCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.poll = {};
		$scope.poll.question = 'Question';
		$scope.poll.options  = ['Option 1', 'Option 2'];
		var count = 3;

		// Add another option to the poll
		$scope.addOption = function() {
			$scope.poll.options.push('Option ' + count);
			count++;
		};

		// Remove this option from the poll
		$scope.removeOption = function(index) {
			$scope.poll.options.splice(index, 1);
		};

		// Add the poll to the database
		$scope.submitPoll = function() {
			$http.post('/api/submit-poll', {
				question: $scope.poll.question,
				options : $scope.poll.options
			}).then(function() { // Success
				// Redirect to home page
				$location.path('/');
			}, function() {
				// Failure
				
			});
		};
	}]);