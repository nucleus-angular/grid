/**
 * Header component for the grid system
 *
 * @mdoule ng.grid.header
 * @ngdirective nagGridHeader
 *
 * @nghtmlattribute {empty} nag-grid-header Tell AngularJS this element is a grid header component
 */
angular.module('nag.grid.header', [])
.directive('nagGridHeader', [
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
            var template = scope.options.headerTemplateUrl;
            $(element).addClass('grid-header');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
