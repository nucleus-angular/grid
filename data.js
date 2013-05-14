angular.module('nag.grid.data', [])
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
      scope: false,
      compile: function() {
        return {
          pre: function(scope, element) {
            var template = scope.options.dataTemplateUrl;
            $(element).addClass('nag-grid-data');

            var html = nagHelper.getAsyncTemplate(template);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
