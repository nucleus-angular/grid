/**
 * Settings component for the grid system
 *
 * @mdoule ng.grid.settings
 * @ngdirective nagGridSettings
 *
 * @nghtmlattribute {empty} nag-grid-settings Tell AngularJS this element is a grid settings component
 */
angular.module('nag.grid')
.directive('nagGridSettings', [
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
            var template = nagHelper.getTemplatePath('grid', 'settings');
            $(element).addClass('grid-settings');

            var html = nagHelper.getAsyncTemplate(template, scope.options);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
