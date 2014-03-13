/**
 * Footer component for the grid system
 *
 * @mdoule ng.grid.Footer
 * @ngdirective nagGridFooter
 *
 * @nghtmlattribute {empty} nag-grid-footer Tell AngularJS this element is a grid footer component
 */
angular.module('nag.grid')
.directive('nagGridFooter', [
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
            var template = nagHelper.getTemplatePath('grid', 'footer');
            $(element).addClass('grid-footer');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
