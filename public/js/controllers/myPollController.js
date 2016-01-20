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
				drawGraph();
			}, function(response) {		// Failure
				$scope.problem = 'Could not load the poll data from the server :(';
			})

		// Visualize the voting data using D3.js
		var drawGraph = function() {
			// Scale the x-axis of the graph
			var x = d3.scale.linear()
		    .domain([0, d3.max($scope.poll.votes)])
		    .range([0, 500]);

			d3.select('#graph')
				.selectAll('div')
					.data($scope.poll.votes)
				.enter().append('div')
					.style('width', function(d) { return x(d)+'px'; })
					.text(function(d) { return d; });
		}
	}]);