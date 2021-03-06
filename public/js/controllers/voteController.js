angular.module('voteController', [])
	.controller('VoteCtrl', ['$http', '$scope', '$location', '$route', function($http, $scope, $location, $route) {
		$scope.poll_retrieved = false;
		var selected_option = ''; 

		// Determine whether a user is logged in
		$http.get('/api/auth').success(function(response) {
			$scope.authenticated 	= response.authenticated;
			if(response.active_user) { // Try to get the name of the active user
				$scope.active_user 	= response.active_user.name;
			}
		});

		// Try to retrieve the poll from given poll ID
		$scope.goVote = function() {
			if($scope.poll_id == '' || $scope.poll_id == undefined) {
				$scope.problem = 'Please enter a valid poll ID.';
			} else {
				console.log('Trying to retrieve poll from server.');
				// Try to get the poll
				$http.post('/api/poll', {
					id: $scope.poll_id
				}).then(pollRetrieved, 
						pollNotRetrieved);
			}
		};

		// Check if the user came here with the poll ID in the URL
		var checkUrlData = function() {
			if($location.search().id != undefined) {
				$scope.poll_id = $location.search().id;
				$scope.goVote();
			}
		}

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
				$location.path('/my-poll');
			}).error(function(err, data) {
				console.log(data);
			});
		}

		// Add a custom option to the poll
		$scope.addCustomOption = function() {
			if($scope.custom != undefined) {
				if($scope.custom.option != '') {
					$http.post('/api/add-custom-option', {
						poll_id: $scope.poll_id,
						custom_option: $scope.custom.option
					}).success(function(response) {
						// Success! Reload the page
						$route.reload();
					});
				}
			}
		}

		// Successfully retrieved a poll from the database
		var pollRetrieved = function(response) {
			console.log('Poll successfully retrieved from the server.');
			$scope.poll_retrieved = true;
			$scope.poll = response.data;
		};
		// Failed to retrieve poll
		var pollNotRetrieved = function(response) {
			console.log('Poll NOT successfully retrieved from the server.');
			if(response.status == 403) { // Forbidden, i.e. the user needs to log in
				$scope.problem = 'You need to log in first!';
				$location.path('/login');
			}  else if(response.data == 'Poll not found') {
				$scope.problem = 'The supplied poll ID does not match any polls in the database.'
					+ '\nIt may have been deleted by its owner.';
			} else { // Something else went wrong ...
				$scope.problem = 'Could not retrieve the poll.';	
			}			
		};

		// Check if the user came here via a shared URL with embedded poll ID
		checkUrlData();
	}]);