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
			var width 		= 500,
				barHeight 	= 20;

			var x = d3.scale.linear()
				.domain([0, d3.max($scope.poll.votes)])
				.range([0, width]);

			var chart = d3.select('.chart')
				.attr('width' , width)
				.attr('height', barHeight * $scope.poll.votes.length);

			var bar = chart.selectAll('g')
				.data($scope.poll.votes)
				.enter().append('g')
				.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

			bar.append('rect')
				.attr('width', x)
				.attr('height', barHeight - 1);

			bar.append("text")
			    .attr("x", function(d) { return x(d) - 3; })
			    .attr("y", barHeight / 2)
			    .attr("dy", ".35em")
			    .text(function(d) { return d; });
		}
	}]);