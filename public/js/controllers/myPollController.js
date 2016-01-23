angular.module('myPollController', [])
	.controller('MyPollCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
		$http.post('/api/poll', { id: $location.search().id })
			.then(function(response) {	// Success
				// Make the poll data available to the front-end
				$scope.poll = response.data;
				// Calculate the total amount of votes cast
				$scope.poll.total_votes = 0;
				for(var i=0; i<$scope.poll.options.length; i++) {
					$scope.poll.total_votes += $scope.poll.options[i].votes;
				}
				drawGraph();
			}, function(response) {		// Failure
				$scope.problem = 'Could not load the poll data from the server :(';
			})

		// Visualize the voting data using D3.js
		var drawGraph = function() {
			
			var data = $scope.poll.options,
					width = 750,
					barHeight = 20;

			var x = d3.scale.linear()
				.range([0, width-200])
				.domain([0, d3.max(data, function(d) { return d.votes; })]);

			var chart = d3.select('.chart')
				.attr('width',  width)
				.attr('height', barHeight * data.length);

			var bar = chart.selectAll('g')
					.data(data)
				.enter().append('g')
					.attr('transform', function(d, i) {
						return ('translate(200,' + barHeight*i + ')');
					});

			bar.append('rect')
				.attr('height', barHeight-1)
				.attr('width', function(d) { return x(d.votes); });

			bar.append("text")
			  .attr("x", function(d) { return x(d.votes) - 3; })
			  .attr("y", barHeight / 3)
			  .attr("dy", ".75em")
			  .text(function(d) {
			  	if(d.votes > 0) {
			  		return d.votes;
			  	}
			  });

		  bar.append('text')
		  	.attr('x', function(d) { return -10; })
		  	.attr('y', function(d) { return barHeight / 3 })
		  	.attr('dy', '.75em')
		  	.text(function(d) { return d.description; });

		}
	}]);