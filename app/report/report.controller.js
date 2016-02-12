import angular from 'angular';

angular.module('reportController', ['selectedFilesService']).

controller('ReportSelectionController', ['$scope', '$routeSegment', function($scope, $routeSegment) {
  $scope.$routeSegment = $routeSegment;
}]).

controller('ReportController', ['$scope', 'Facet', 'SelectedFiles', 'Transfer', function($scope, Facet, SelectedFiles, Transfer) {
  $scope.records = SelectedFiles;

  $scope.format_sort_property = 'format';
  $scope.format_reverse = false;
  $scope.format_sort_fn = function(record) {
    var sort_prop = $scope.format_sort_property;
    if (sort_prop === 'puid') {
      return record.puid;
    } else {
      return record.data[sort_prop];
    }
  };

  $scope.set_sort_property = function(property, sort_prop, reverse_prop) {
    if ($scope[sort_prop] === property) {
      $scope[reverse_prop] = !$scope[reverse_prop];
    } else {
      $scope[reverse_prop] = false;
      $scope[sort_prop] = property;
    }
  };

  $scope.tag_sort_property = 'tag';
  $scope.tag_reverse = false;
  $scope.tag_sort_fn = function(args) {
    var tag = args[0], count = args[1];
    return $scope.tag_sort_property === 'tag' ? tag : count;
  };

  $scope.add_format_facet = format => {
    Facet.add('format', format, {name: 'Format', text: format});
    Transfer.filter();
  };

  $scope.add_group_facet = group => {
    Facet.add('group', group, {name: 'Format group', text: group});
    Transfer.filter();
  };
}]);
