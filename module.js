/**
 * Nucleus Angular Grid Component
 *
 * @module nag.grid
 */
angular.module('nag.grid', [
  'nag.core'
])
.run([
  'nagDefaults',
  'nagHelper',
  function(nagDefaults, nagHelper) {
    /**
     * Options
     *
     * @ngscope
     * @property {object} options
     *   @property {number} [currentPage=1] Current page fof data displaying in the grid
     *   @property {array} [data=[]] Current set of data displaying in the grid
     *   @todo: implement: implement filters
     *   @property {array} [filters=[]] Filter to apply when retrieving the data for the grid
     *   @property {function} [generateDataUrl] Generates the url to use when retrieving data from the grid
     *   @property {array} [itemsPerPageOptions=[10,20,30,40,50]] The different option the use can choose from from items per page in grid
     *   @property {number} [itemsPerPage=10] The current number of items displaying per page in the grid
     *   @property {number} [maxColumnWidth=0] Maximum column width (0 for no max)
     *   @property {number} [minColumnWidth=50] Minimum column width
     *   @property {string} [remoteDataMethod="GET"] Default http method from retrieving the data for the grid
     *   @todo: implement: implement reorderable
     *   @property {boolean} [reorderable=false] Whether or not you can reorder the data rows
     *   @property {boolean} [rowMultiSelect=true] Whether or not you can select multiple rows
     *   @property {boolean} [rowSelectable=false] Whether or not you can select rows
     *   @property {boolean} [rowSelectableCheckbox=true] Whether or not to use a checkbox to selct the row
     *   @property {string} [headerTemplateUrl="header.html"] Header template url
     *   @property {string} [headerTemplate=null] Header template html
     *   @property {string} [footerTemplateUrl="footer.html"] Footer template url
     *   @property {string} [footerTemplate=null] Footer template html
     *   @property {string} [settingsTemplateUrl="settings.html"] Settings template url
     *   @property {string} [settingsTemplate=null] Setting template html
     *   @property {string} [loadingTemplateUrl="loading.html"] Loading template url
     *   @property {string} [loadingTemplat=null] Loading template html
     *   @property {string} [dataTemplateUrl="data.html"] Data template url
     *   @property {string} [dataTemplate=null] Data template html
     *   @property {string} [actionsTemplateUrl="actions.html"] Actions template url
     *   @property {string} [actionsTemplate=null] Actions template html
     *   @property {boolean} [rowKeyboardMultiSelect] Require the keyboard alt key to be held to select multiple rows
     *   @property {array} [selected=[]] Indexes (zero-based) or select row elements
     *   @property {object} [sort={}] Sort information
     *   @property {boolean} [multiSorting=true] Whether or not to allow sorting on multiple columns
     *   @property {number} [totalRecords] Total number of records for the grid
     *   @property {string} [templateUrl="grid.html"] Main template url
     *   @property {string} [template=null] Main template html
     *   @property {boolean} [showSettingsToggle=true] Show the toggle icon for showing/hiding the settings
     *   @property {function|null} [parseResponse=null] A function to use to parse the data, must return an object with a property data and totalRecords
     *   @property {boolean} [hasActions=false] Whether or not to show the actions column
     *   @property {string} [selectionMode="row"] Selection mode
     */
    nagDefaults.setOptions('grid', {
      caption: null,
      columnModel: {},
      currentPage: 1,
      data: [],
      showSettingsToggle: true,
      displaySettings: false,
      filters: null, //todo: implement
      generateDataUrl: function(){},
      parseResponse: null,
      itemsPerPageOptions: [10, 20, 30, 40, 50],
      itemsPerPage: 10,
      maxColumnWidth: 0,
      minColumnWidth: 50,
      remoteDataMethod: 'GET',
      reorderable: false,//todo: implement
      rowMultiSelect: true,
      rowSelectable: false,
      rowSelectableCheckbox: true,
      headerTemplateUrl: 'nucleus-angular-grid/assets/templates/header.html', ///
      headerTemplate: null, ///
      footerTemplateUrl: 'nucleus-angular-grid/assets/templates/footer.html', ///
      footerTemplate: null, ///
      settingsTemplateUrl: 'nucleus-angular-grid/assets/templates/settings.html', ///
      settingsTemplate: null, ///
      loadingTemplateUrl: 'nucleus-angular-grid/assets/templates/loading.html', ///
      loadingTemplate: null, ///
      dataTemplateUrl: 'nucleus-angular-grid/assets/templates/data.html', ///
      dataTemplate: null, ///
      actionsTemplateUrl: 'nucleus-angular-grid/assets/templates/actions.html', ///
      actionsTemplate: null, ///
      rowKeyboardMultiSelect: false,
      selected: [],
      sort: {},
      multiSorting: true,
      totalRecords: 0,
      templateUrl: 'nucleus-angular-grid/assets/templates/grid.html', ///
      template: null, ///
      hasActions: false,
      selectionMode: 'row'
    });

    /**
     * Column Model
     *
     * @ngscope
     * @property {object} options.columnModel
     *   @property {string} [title=null] Text to use as the header in the column of the grid
     *   @property {string} [property=null] The property name of the object stored in options.data to pull the data for
     *   @property {string} [headerTemplateUrl="header-data-cell.html"] Header data cell template url
     *   @property {string} [headerTemplate=null] Header data cell template html
     *   @property {string} [templateUrl="data-cell.html"] Data cell template url
     *   @property {string} [template=null] Data cell template html
     *   @property {boolean} [display=true] Whether or not to display the column
     *   @property {boolean} [sortable=false] Whether or not the column is sortable
     *   @property {boolean} [resizable=true] Whether or not the column is resizable
     *   @todo: implement: implement filterable
     *   @property {boolean} [filterable=false] Whether or not the column is filterable
     *   @property {number} [width=0] The current width of the column
     *   @property {number} [minWidth=0] Minimum width of the column
     *   @property {number} [maxWidth=0] Maximum width of the column
     *   @property {string} [cssClass=""] String to add to the class of the data cells
     *   @property {string} [cssHeaderClass=""] String to add to the class of the header data cells
     *   @property {function} [getTemplatePath=function(){}] Function used to get template paths
     */
    nagDefaults.setOptions('gridColumnModel', {
      title: null,
      property: null,
      headerTemplateUrl: 'nucleus-angular-grid/assets/templates/header-data-cell.html', ///
      headerTemplate: null, ///
      templateUrl: 'nucleus-angular-grid/assets/templates/data-cell.html', ///
      template: null, ///
      display: true,
      sortable: false,
      resizable: true,
      filterable: false, //todo - implement
      width: 0,
      minWidth: 0,
      maxWidth: 0,
      cssClass: '',
      cssHeaderClass: '',
      getTemplatePath: function(templateName) {
        return nagHelper.getTemplatePath('gridColumnModel', templateName);
      }
    });

    nagDefaults.setOptionsGetter('gridOptions', function(options) {
      var getColumnModelOptions = function(columnModel) {
        var gridColumnOptions = nagDefaults.getOptions('gridColumnModel');

        angular.forEach(columnModel, function(value, key) {
          columnModel[key] = angular.extend(_.clone(gridColumnOptions, true), columnModel[key]);
        });

        return columnModel;
      }

      var gripOptions = nagDefaults.getOptions('grid');
      var newOptions = angular.extend(gripOptions, options);

      if(angular.isArray(options.columnModel) && options.columnModel.length > 0) {
        options.columnModel = getColumnModelOptions(options.columnModel);
      }

      return newOptions;
    });
  }
]);
