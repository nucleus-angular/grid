/**
 * Actions component for the grid system
 *
 * @mdoule ng.grid.actions
 * @ngdirective nagGridActions
 *
 * @nghtmlattribute {empty} nag-grid-actions Tell AngularJS this element is a grid actions component
 */
angular.module('nag.grid.actions', [])
.directive('nagGridActions', [
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
            var html = nagHelper.getAsyncTemplate(scope.options.actionsTemplateUrl, scope.options);
            $(element).append($compile(html)(scope));
            $(element).addClass('grid-actions');
          }
        };
      }
    };
    return ngCell;
  }
]);
