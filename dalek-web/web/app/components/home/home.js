var genericDataUrl = function() {
  var url, sortArray;
  url = '/api/v1/users?itemsPerPage=' + this.options.itemsPerPage;

  if(this.options.currentPage > 1) {
    var offset = (this.options.currentPage - 1) * this.options.itemsPerPage;
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += 'offset=' + offset;
  }

  return url;
};
var genericColumnModel = [{
  title: 'ID',
  property: 'id'
}, {
  title: 'First Name',
  property: 'firstName',
  sortable: true
}, {
  title: 'Last Name',
  property: 'lastName',
  sortable: true
}, {
  title: 'Username',
  property: 'username',
  sortable: true
}];

angular.module('app.home.home', [
  'app.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('app.home.columnModelAutoWidth', {
      url: '/column-model-auto-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-auto-width.html',
          controller: 'HomeCtrlColumnModelAutoWidth'
        }
      }
    })
    .state('app.home.columnModelDisplayIdOnLoad', {
      url: '/column-model-display-id-on-load',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-display-id-on-load.html',
          controller: 'HomeCtrlColumnModelDisplayIdOnLoad'
        }
      }
    })
    .state('app.home.columnModelDontDisplayIdOnLoad', {
      url: '/column-model-dont-display-id-on-load',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-dont-display-id-on-load.html',
          controller: 'HomeCtrlColumnModelDontDisplayIdOnLoad'
        }
      }
    })
    .state('app.home.columnModelIdMaxWidth', {
      url: '/column-model-id-max-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-max-width.html',
          controller: 'HomeCtrlColumnModelIdMaxWidth'
        }
      }
    })
    .state('app.home.columnModelIdMinWidth', {
      url: '/column-model-id-min-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-min-width.html',
          controller: 'HomeCtrlColumnModelIdMinWidth'
        }
      }
    })
    .state('app.home.columnModelIdNotResizable', {
      url: '/column-model-id-not-resizable',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-not-resizable.html',
          controller: 'HomeCtrlColumnModelIdNotResizable'
        }
      }
    })
    .state('app.home.columnModelIdNotSortable', {
      url: '/column-model-id-not-sortable',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-not-sortable.html',
          controller: 'HomeCtrlColumnModelIdNotSortable'
        }
      }
    })
    .state('app.home.columnModelIdResizable', {
      url: '/column-model-id-resizable',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-resizable.html',
          controller: 'HomeCtrlColumnModelIdResizable'
        }
      }
    })
    .state('app.home.columnModelIdSetWidth', {
      url: '/column-model-id-set-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-set-width.html',
          controller: 'HomeCtrlColumnModelIdSetWidth'
        }
      }
    })
    .state('app.home.columnModelIdSortable', {
      url: '/column-model-id-sortable',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/column-model-id-sortable.html',
          controller: 'HomeCtrlColumnModelIdSortable'
        }
      }
    })
    .state('app.home.customResponse', {
      url: '/custom-response',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/custom-response.html',
          controller: 'HomeCtrlCustomResponse'
        }
      }
    })
    .state('app.home.hasActions', {
      url: '/has-actions',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/has-actions.html',
          controller: 'HomeCtrlHasActions'
        }
      }
    })
    .state('app.home.loadPage3OnLoad', {
      url: '/load-page-3-on-load',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/load-page-3-on-load.html',
          controller: 'HomeCtrlLoadPage3OnLoad'
        }
      }
    })
    .state('app.home.maxColumnWidth', {
      url: '/max-column-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/max-column-width.html',
          controller: 'HomeCtrlMaxColumnWidth'
        }
      }
    })
    .state('app.home.minColumnWidth', {
      url: '/min-column-width',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/min-column-width.html',
          controller: 'HomeCtrlMinColumnWidth'
        }
      }
    })
    .state('app.home.multiSelectRow', {
      url: '/multi-select-row',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/multi-select-row.html',
          controller: 'HomeCtrlMultiSelectRow'
        }
      }
    })
    .state('app.home.multiSelectRowWithKeyboard', {
      url: '/multi-select-row-with-keyboard',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/multi-select-row-with-keyboard.html',
          controller: 'HomeCtrlMultiSelectRowWithKeyboard'
        }
      }
    })
    .state('app.home.multiSorting', {
      url: '/multi-sorting',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/multi-sorting.html',
          controller: 'HomeCtrlMultiSorting'
        }
      }
    })
    .state('app.home.noActions', {
      url: '/no-actions',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/no-actions.html',
          controller: 'HomeCtrlNoActions'
        }
      }
    })
    .state('app.home.noSettingsToggle', {
      url: '/no-settings-toggle',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/no-settings-toggle.html',
          controller: 'HomeCtrlNoSettingsToggle'
        }
      }
    })
    .state('app.home.selectRowWithCheckboxes', {
      url: '/select-row-with-checkboxes',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/select-row-with-checkboxes.html',
          controller: 'HomeCtrlSelectRowWithCheckboxes'
        }
      }
    })
    .state('app.home.selectRowWithoutCheckboxes', {
      url: '/select-row-without-checkboxes',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/select-row-without-checkboxes.html',
          controller: 'HomeCtrlSelectRowWithoutCheckboxes'
        }
      }
    })
    .state('app.home.selectionModeCheckbox', {
      url: '/selection-mode-checkbox',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/selection-mode-checkbox.html',
          controller: 'HomeCtrlSelectionModeCheckbox'
        }
      }
    })
    .state('app.home.selectionModeRow', {
      url: '/selection-mode-row',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/selection-mode-row.html',
          controller: 'HomeCtrlSelectionModeRow'
        }
      }
    })
    .state('app.home.showSettingsToggle', {
      url: '/show-settings-toggle',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/show-settings-toggle.html',
          controller: 'HomeCtrlShowSettingsToggle'
        }
      }
    })
    .state('app.home.singleRowSelect', {
      url: '/single-row-select',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/single-row-select.html',
          controller: 'HomeCtrlSingleRowSelect'
        }
      }
    })
    .state('app.home.singleSorting', {
      url: '/single-sorting',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/single-sorting.html',
          controller: 'HomeCtrlSingleSorting'
        }
      }
    });
  }
])
.controller('HomeCtrlColumnModelAutoWidth', ['$scope', function($scope) {
  $scope.cmIdAutoWidthOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      width: 0
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelDisplayIdOnLoad', ['$scope', function($scope) {
  $scope.cmDisplayIdOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelDontDisplayIdOnLoad', ['$scope', function($scope) {
  $scope.cmDontDisplayIdOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: false
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdMaxWidth', ['$scope', function($scope) {
  $scope.cmIdMaxWidth20Options = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      maxWidth: 20,
      resizable: true
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
  };
}])
.controller('HomeCtrlColumnModelIdMinWidth', ['$scope', function($scope) {
  $scope.cmIdMinWidth150Options = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      minWidth: 150,
      resizable: true
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdNotResizable', ['$scope', function($scope) {
  $scope.cmIdNotResizableOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      resizable: false
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdNotSortable', ['$scope', function($scope) {
  $scope.cmIdNotSortableOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      sortable: false
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdResizable', ['$scope', function($scope) {
  $scope.cmIdResizableOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      resizable: true
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdSetWidth', ['$scope', function($scope) {
  $scope.cmIdWidth300Options = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      width: 300
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlColumnModelIdSortable', ['$scope', function($scope) {
  $scope.cmIdSortableOptions = {
    columnModel: [{
      title: 'ID',
      property: 'id',
      display: true,
      sortable: true
    }, {
      title: 'First Name',
      property: 'firstName',
      sortable: true
    }, {
      title: 'Last Name',
      property: 'lastName',
      sortable: true
    }, {
      title: 'Username',
      property: 'username',
      sortable: true
    }],
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlCustomResponse', ['$scope', function($scope) {
  $scope.customResponseOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: function() {
      var url, sortArray;
      url = '/api/v1/users_custom_response?itemsPerPage=' + this.options.itemsPerPage;

      if(this.options.currentPage > 1) {
        var offset = (this.options.currentPage - 1) * this.options.itemsPerPage;
        url += url.indexOf('?') === -1 ? '?' : '&';
        url += 'offset=' + offset;
      }

      return url;
    },
    parseResponse: function(response) {
      return {
        data: response.data,
        totalRecords: response.totalRecords
      }
    }
  };
}])
.controller('HomeCtrlHasActions', ['$scope', function($scope) {
  $scope.hasActionsOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    hasActions: true
  };
}])
.controller('HomeCtrlLoadPage3OnLoad', ['$scope', function($scope) {
  $scope.loadPage3Options = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    currentPage: 3
  };
}])
.controller('HomeCtrlMaxColumnWidth', ['$scope', function($scope) {
  $scope.maxColumnWidth35Options = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    maxColumnWidth: 35
  };
}])
.controller('HomeCtrlMinColumnWidth', ['$scope', function($scope) {
  $scope.minColumnWidth150Options = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    minColumnWidth: 150
  };
}])
.controller('HomeCtrlMultiSelectRow', ['$scope', function($scope) {
  $scope.multiSelectRowOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowMultiSelect: true,
    rowSelectable: true
  };
}])
.controller('HomeCtrlMultiSelectRowWithKeyboard', ['$scope', function($scope) {
  $scope.multiSelectRowKeyboardOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowMultiSelect: true,
    rowKeyboardMultiSelect: true,
    rowSelectable: true
  };
}])
.controller('HomeCtrlMultiSorting', ['$scope', function($scope) {
  $scope.multiSortingOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    multiSorting: true
  };
}])
.controller('HomeCtrlNoActions', ['$scope', function($scope) {
  $scope.noActionsOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    hasActions: false
  };
}])
.controller('HomeCtrlNoSettingsToggle', ['$scope', function($scope) {
  $scope.dontShowSettingsToggleOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    showSettingsToggle: false
  };
}])
.controller('HomeCtrlSelectRowWithCheckboxes', ['$scope', function($scope) {
  $scope.selectCheckboxesOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowSelectable: true,
    rowSelectableCheckbox: true
  };
}])
.controller('HomeCtrlSelectRowWithoutCheckboxes', ['$scope', function($scope) {
  $scope.selectNoCheckboxesOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowSelectable: true,
    rowSelectableCheckbox: false
  };
}])
.controller('HomeCtrlSelectionModeCheckbox', ['$scope', function($scope) {
  $scope.selectionModeCheckboxOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowSelectable: true,
    selectionMode: 'checkbox'
  };
}])
.controller('HomeCtrlSelectionModeRow', ['$scope', function($scope) {
  $scope.selectionModeRowOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowSelectable: true,
    selectionMode: 'row'
  };
}])
.controller('HomeCtrlShowSettingsToggle', ['$scope', function($scope) {
  $scope.showSettingsToggleOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl
  };
}])
.controller('HomeCtrlSingleRowSelect', ['$scope', function($scope) {
  $scope.singleSelectRowOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowMultiSelect: false,
    rowSelectable: true
  };
}])
.controller('HomeCtrlSingleSorting', ['$scope', function($scope) {
  $scope.singleSortingOptions = {
    columnModel: genericColumnModel,
    itemsPerPageOptions: [3, 4],
    itemsPerPage: 3,
    generateDataUrl: genericDataUrl,
    rowSelectable: true,
    rowSelectableCheckbox: true,
    multiSorting: false
  };
}]);
