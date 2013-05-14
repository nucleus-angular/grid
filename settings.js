angular.module('nag.grid.settings', [])
.directive('nagGridSettings', [
  '$compile',
  '$http',
  '$templateCache',
  'nagHelper',
  'nagDefaults',
  function($compile, $http, $templateCache, nagHelper, nagDefaults) {
    var ngCell = {
      restrict: 'A',
      scope: false,
      compile: function() {
        return {
          pre: function(scope, element) {
            var template = scope.options.settingsTemplateUrl;
            $(element).addClass('nag-grid-settings');

            var html = nagHelper.getAsyncTemplate(template);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
