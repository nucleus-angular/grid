/**
 * HeaderDataCell component for the grid system
 *
 * @mdoule ng.grid.headerDataCell
 * @ngdirective nagGridHeaderDataCell
 *
 * @nghtmlattribute {empty} nag-grid-header-data-cell Tell AngularJS this element is a grid header data cell component
 */
angular.module('nag.grid.headerDataCell', [
  'nag.core'
])
.directive('nagGridHeaderDataCell', [
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
            $(element).addClass('grid-header-data-cell');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
