/**
 * Data cell component for the grid system
 *
 * @mdoule ng.grid.dataCell
 * @ngdirective nagGridDataCell
 *
 * @nghtmlattribute {empty} nag-grid-data-cell Tell AngularJS this element is a grid data cell component
 */
angular.module('nag.grid')
.directive('nagGridDataCell', [
  '$compile',
  '$http',
  '$templateCache',
  'nagHelper',
  'nagDefaults',
  function($compile, $http, $templateCache, nagHelper, nagDefaults) {
    var ngCell = {
      restrict: 'A',
      compile: function() {
        return {
          pre: function(scope, element, attributes) {
            var template = scope.$eval(attributes.template);
            element.addClass('grid-data-cell');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
