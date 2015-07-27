'use strict';

(function() {
  var treeController = angular.module('treeController', []).

  controller('TreeController', ['$scope', 'SelectedFiles', 'Tag', 'Transfer', function($scope, SelectedFiles, Tag, Transfer) {
    $scope.helper = function() {
      var uuid = $(this).attr('uuid');
      var file = Transfer.id_map[uuid];
      // TODO: style this element
      return $('<div>' + file.title + '</div>');
    };

    $scope.options = {
      dirSelectable: true,
      multiSelection: true,
      equality: function(a, b) {
        if (a === undefined || b === undefined) {
          return false;
        }
        return a.id === b.id;
      },
      injectClasses: {
        li: 'file',
      },
    };
    $scope.filter_expression = {display: true};
    $scope.filter_comparator = true;

    $scope.remove_tag = function(id, tag) {
      Tag.remove(id, tag);
    };

    var add_file = function(node) {
      SelectedFiles.add(node);
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          add_file(child);
        }
      }
    };

    var remove_file = function(node) {
      SelectedFiles.remove(node.id);
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          remove_file(child);
        }
      }
    };

    // TODO: * this does select all files, but it doesn't select them in the UI
    $scope.track_selected = function(node, selected) {
      if (selected) {
        add_file(node);
      } else {
        remove_file(node);
      }
    };
    $scope.transfers = Transfer;
    Transfer.resolve();

    $scope.deselect = function() {
      SelectedFiles.selected = [];
    };

    $scope.files = SelectedFiles;
    $scope.submit = function() {
      var tag = this.tag;
      if (!tag) {
        return;
      }

      Tag.add_list(SelectedFiles.list_ids(), tag);
      this.tag = '';
    };
  }]);
})();
