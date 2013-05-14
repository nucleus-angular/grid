angular.module('nag.grid.footer', [])
.directive('nagGridFooter', [
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
            var template = scope.options.footerTemplateUrl;
            $(element).addClass('nag-grid-footer');

            var html = nagHelper.getAsyncTemplate(template);
            element.append($compile(html)(scope));
          }
        };
      }
    };
    return ngCell;
  }
]);
