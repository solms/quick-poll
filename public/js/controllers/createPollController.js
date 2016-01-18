angular.module('createPollController', [])
	.controller('CreatePollCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
		$scope.poll_question = 'Question';
		$scope.poll_options  = ['Option 1', 'Option 2'];
		var count = 3;

		// Add another option to the poll
		$scope.addOption = function() {
			$scope.poll_options.push('Option ' + count);
			count++;
		};

		// Remove this option from the poll
		$scope.removeOption = function(index) {
			$scope.poll_options.splice(index, 1);
		};

		// Add the poll to the database
		$scope.submitPoll = function() {
			$http.post('/submit-poll', {
				question: $scope.poll_question,
				options : $scope.poll_options
			}).then(function() {
				// Success callback
				console.log('Added the poll to the database.');
				$location.path('/');
			}, function() {
				// Failure callback
				console.log('Please log in first.');
			});
		};
	}]);