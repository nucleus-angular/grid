angular.module('nag.grid.dataCell', [])
.directive('nagGridDataCell', [
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
          pre: function(scope, element, attributes) {
            var template = scope.$eval(attributes.template);
            $(element).addClass('nag-grid-data-cell');

            var html = nagHelper.getAsyncTemplate(template);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
