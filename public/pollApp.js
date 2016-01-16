angular.module('pollApp', [])
  .controller('createController', ['$scope', '$http', function($scope, $http) {
    $scope.options = [{ val: 'Option 1'}, { val: 'Option 2'}];

    // Add another option to the created poll
    this.addOption = function() {
      if($scope.options[$scope.options.length-1].val == 'Another option') {
        console.log('Edit your latest option first...');
      } else {
        $scope.options.push({
          val: 'Another option'
        });
      }
    }

    // Save the created poll
    this.savePoll = function() {
      // TODO HERE! Send JSON data to server
      console.log('Got in!');
      $http.post('/create-poll', { name: 'Solms' })
        .success(function(){
          console.log('Successfully sent data to the server.');
        });
    };
  }]);