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
			var width = 750,
			    height = 300;

			var y = d3.scale.linear()
			    .range([height, 0]);

			var chart = d3.select(".chart")
			    .attr("width", width)
			    .attr("height", height);

			var data = $scope.poll.options;
			console.log('data:');
			console.log(data);

			y.domain([0, d3.max(data, function(d) { return d.votes; })]);

			var barWidth = width / data.length;

			var bar = chart.selectAll("g")
			  .data(data)
			.enter().append("g")
			  .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

			bar.append("rect")
			  .attr("y", function(d) { return y(d.votes); })
			  .attr("height", function(d) { return height - y(d.votes); })
			  .attr("width", barWidth - 1);

			bar.append("text")
			  .attr("x", barWidth / 2)
			  .attr("y", function(d) { return y(d.votes) + 3; })
			  .attr("dy", ".75em")
  .text(function(d) { return d.votes; });

		}
	}]);