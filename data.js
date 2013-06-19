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
      compile: function() {
        return {
          pre: function(scope, element) {
            var template = scope.options.dataTemplateUrl;
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
