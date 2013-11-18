/**
 * loading component for the grid system
 *
 * @mdoule ng.grid.loading
 * @ngdirective nagGridLoading
 *
 * @nghtmlattribute {empty} nag-grid-loading Tell AngularJS this element is a grid loading component
 */
angular.module('nag.grid.loading', [
  'nag.core'
])
.directive('nagGridLoading', [
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
          pre: function(scope, element) {
            var template = scope.options.loadingTemplateUrl;
            $(element).addClass('grid-loading');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
