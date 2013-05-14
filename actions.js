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
      scope: false,
      compile: function() {
        return {
          pre: function(scope, element, attributes) {
            var html = nagHelper.getAsyncTemplate(scope.options.actionsTemplateUrl);
            $(element).append($compile(html)(scope));
            $(element).addClass('nag-grid-actions');
          }
        };
      }
    };
    return ngCell;
  }
]);
