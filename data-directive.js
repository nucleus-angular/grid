/**
 * Data component for the grid system
 *
 * @mdoule ng.grid
 * @ngdirective nagGridData
 *
 * @nghtmlattribute {empty} nag-grid-data Tell AngularJS this element is a grid data component
 */
angular.module('nag.grid')
.directive('nagGridData', [
  '$compile',
  '$http',
  '$templateCache',
  '$timeout',
  'nagHelper',
  'nagDefaults',
  function($compile, $http, $templateCache, $timeout, nagHelper, nagDefaults) {
    var ngCell = {
      restrict: 'A',
      compile: function() {
        return {
          pre: function(scope, element) {
            var template = nagHelper.getTemplatePath('grid', 'data');
            $(element).addClass('grid-data');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
