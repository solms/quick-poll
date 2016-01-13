angular.module('pollApp', [])
  .controller('createController', ['$scope', function($scope) {
    $scope.options = [{ val: 'Option 1'}, { val: 'Option 2'}];

    this.addOption = function() {
      if($scope.options[$scope.options.length-1].val == 'Another option') {
        console.log('Edit your latest option first...');
      } else {
        $scope.options.push({
          val: 'Another option'
        });
      }
    }
  }]);