
/**
 * Grid component
 *
 * @todo: filtering
 * @todo: row reordering
 * @todo: handle data loading error gracefully
 * @todo: think: should we have abbr tags to display full value if part of data is being hidden
 * @todo: think: should we have disable normal text selection and add other functionality that makes is easier to select the data from a cell when row selection is on
 * @todo: think: should we have either or both hitting esc of clicking outside the column-selection area hide it is the column selection area is showing
 *
 * @module nag.grid.grid
 * @ngdirective nagGrid
 *
 * @nghtmlattribute {object} nag-grid Tells AngularJS this element is a grid component and object pased in overwrite defaults for $scope.options
 */

angular.module('nag.grid.grid', [
  'nag.core',
  'nag.grid'
])
.directive('nagGrid', [
  '$timeout',
  '$http',
  '$compile',
  'nagHelper',
  'nagDefaults',
  function($timeout, $http, $compile, nagHelper, nagDefaults){
    return {
      restrict: 'A',
      scope: {
        options: '=nagGrid'
      },
      compile: function() {
        return {
          pre: function(scope, element, attributes) {
            /**
             * Options
             *
             * @ngscope
             * @property {object} options
             *   @property {string} [rootTemplatePath=rootTemplatePath+"/nucleus-angular-grid/assets/templates"] Root path for templates
             *   @property {string} [caption] Caption for grid
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
             *   @property {string} [rowSelectionMode="row"] Row selection mode ("row" only option right now)
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
             *   @property {boolean} [rowShiftMultiSelect] Require shift to be held down when selection multiple rows
             *   @property {array} [selected=[]] Indexes (zero-based) or select row elements
             *   @property {object} [sort={}] Sort information
             *   @property {boolean} [sortMulti=true] Whether or not to allow sorting on multiple columns
             *   @property {number} [totalRecords] Total number of records for the grid
             *   @property {string} [templateUrl="grid.html"] Main template url
             *   @property {string} [template=null] Main template html
             */

            /**
             * Column Model
             *
             * @ngscope
             * @property {object} options.columnModel
             *   @property {string} [rootTemplatePath=rootTemplatePath+'/nucleus-angular-grid/assets/templates'] Root path for templates
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
             */
            scope.options = nagDefaults.getGridOptions(scope.options);

            var html = $(nagHelper.getAsyncTemplate(scope.options.templateUrl, scope.options));
            $(element).append($compile(html)(scope));

            $(element).addClass('grid');
          },
          post: function(scope, element, attributes) {
            var autoResizeGridColumns, resizableGrid, getData;
            /**
             * Automatically resizes the grid columns
             *
             * @ngscope
             * @method autoResize
             */
            autoResizeGridColumns = function() {
              var minWidth;
              var columnCount = $(element).find('.data .data-header .cell').length;

              for(var x = 0; x <= columnCount; x += 1) {
                var property = $(element).find('.data .data-header .cell:eq(' + x + ')').data('property');

                if(property) {
                  var columnModel = ObjectArray.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

                  if(columnModel.width === 0) {
                    minWidth = (scope.options.minColumnWidth >= columnModel.minWidth ? scope.options.minColumnWidth : columnModel.minWidth);
                    var maxWidth = (scope.options.maxColumnWidth >= columnModel.maxWidth ? scope.options.maxColumnWidth : columnModel.maxWidth);
                    var $cells = $(element).find('.data .row .cell.' + columnModel.property);

                    $.each($cells, function(key, value) {
                      minWidth = (minWidth < $(value).width() ? $(value).width() : minWidth);
                    });

                    if(maxWidth > 0 && minWidth > maxWidth) {
                      minWidth = maxWidth;
                    }
                  } else {
                    minWidth = columnModel.width;
                  }

                  $(element).find('.data .row .cell.' + columnModel.property).width(minWidth);
                } else if ($(element).find('.data .data-header .cell:eq(' + x + ')').hasClass('grid-actions-column')) {
                  minWidth = 0;
                  var $cells = $(element).find('.data .row .cell.grid-actions-column');

                  $.each($cells, function(key, value) {
                    minWidth = (minWidth < $(value).width() ? $(value).width() : minWidth);
                  });

                  $(element).find('.data .row .cell.grid-actions-column').width(minWidth);
                }
              }

              resizableGrid();

              if(scope.displayLoading) {
                scope.toggleLoadingDisplay();
              }
            };

            scope.autoResize = autoResizeGridColumns;

            resizableGrid = function() {
              angular.forEach($(element).find('.data .row'), function(row, key) {
                angular.forEach($(row).find('.cell'), function(cell, key) {
                  var property = $(cell).data('property');

                  if(property) {
                    var columnModel = ObjectArray.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

                    if(columnModel.resizable) {
                      var minWidth = (scope.options.minColumnWidth >= columnModel.minWidth ? scope.options.minColumnWidth : columnModel.minWidth);
                      var maxWidth = (scope.options.maxColumnWidth >= columnModel.maxWidth ? scope.options.maxColumnWidth : columnModel.maxWidth);

                      if(columnModel.width > 0 && minWidth > columnModel.width) {
                        minWidth = columnModel.width;
                      }

                      if(maxWidth === 0) {
                        maxWidth = null;
                      }

                      $(element).find('.data .row .cell.' + columnModel.property).resizable({
                        handles: 'e',
                        minWidth: minWidth,
                        maxWidth: maxWidth
                      }).bind("resize", function (e, ui) {
                        //height should always be 100%
                        $(this).css("height", "100%");
                      });;
                      $(cell).resize(function() {
                        $(element).find('.data .row .cell.' + columnModel.property).width($(this).width());
                      });
                    }
                  }
                });
              });
            };

            getData = function() {
              scope.toggleLoadingDisplay();
              $timeout(function() {
                $http({method: scope.options.remoteDataMethod, url: scope.options.generateDataUrl.apply(scope, [])}).
                success(function(data, status, headers, config) {
                  if(angular.isObject(data)) {
                    scope.options.data = data.data.data;
                    scope.options.totalRecords = data.data.meta.totalRecords;
                  } else {
                    scope.toggleLoadingDisplay();
                  }
                }).
                error(function(data, status, headers, config) {
                  scope.toggleLoadingDisplay();
                  //todo: proper error handling
                });
              }, 500);
            };

            /**
             * Determines if the passed record number is a currently selected record
             *
             * @ngscope
             * @method isRecordSelected
             *
             * @param {number} recordNumber Record number (one-based) of the data array
             *
             * @returns {boolean} Whether passed record number is currently selected
             */
            scope.isRecordSelected = function(recordNumber) {
              recordNumber += 1;

              return (scope.options.selected.indexOf(recordNumber) !== -1);
            }

            /**
             * Toggle the record selection state of the passed index (zero-based)
             *
             * @ngscope
             * @method toggleRecordSelection
             *
             * @param {object} $event Event
             * @param {number} recordNumber Record number (one-based) to toggle selection state
             * @param {string} type Type of selection (must match scope.options.rowSelectionMode is order for selection state to toggle)
             */
            scope.toggleRecordSelection = function($event, recordNumber, type) {
              if(type === scope.options.rowSelectionMode) {
                recordNumber += 1;

                if(scope.options.selected.indexOf(recordNumber) === -1) {
                  if(scope.options.rowMultiSelect !== true || (scope.options.rowShiftMultiSelect === true && $event.shiftKey !== true)) {
                    scope.options.selected.length = 0;
                  }

                  scope.options.selected.push(recordNumber);
                } else {
                  scope.options.selected.remove(recordNumber);
                }
              }
            }

            /**
             * Determines is all records are selection
             *
             * @ngscope
             * @ngmethod areAllRecordsSelected
             *
             * @returns {boolean} Whether or not all record are selected
             */
            scope.areAllRecordsSelected = function() {
              return (scope.options.data.length > 0 && scope.options.selected.length === scope.options.data.length);
            }

            /**
             * Toggle all record selection states
             *
             * @ngscope
             * @method toggleAllRecordSelection
             */
            scope.toggleAllRecordSelection = function() {
              if(scope.options.selected.length < scope.options.data.length) {
                var allArray = [];

                for(var x = 0; x < scope.options.data.length; x += 1) {
                  allArray.push(x + 1);
                }

                scope.options.selected = allArray;
              } else {
                scope.options.selected.length = 0;
              }
            }

            /**
             * Decrease the current page
             *
             * @ngscope
             * @method decreaseCurrentPage
             */
            scope.decreaseCurrentPage = function() {
              scope.options.currentPage = (scope.options.currentPage - 1 > 1 ? scope.options.currentPage - 1 : 1);
            };

            /**
             * Increase the current page
             *
             * @ngscope
             * @method increaseCurrentPage
             */
            scope.increaseCurrentPage = function() {
              scope.options.currentPage = (scope.options.currentPage + 1 < scope.getMaxPage() ? scope.options.currentPage + 1 : scope.getMaxPage());
            };

            /**
             * Retrieve the max page number
             *
             * @ngscope
             * @method getMaxPage
             *
             * @returns {number} Max page number
             */
            scope.getMaxPage = function() {
              return Math.ceil(scope.options.totalRecords / scope.options.itemsPerPage);
            };

            /**
             * Determine the ending record number for the current page
             *
             * @ngscope
             * @method getEndingRecordNumber
             *
             * @returns {number} Current page ending record number
             */
            scope.getEndingRecordNumber = function() {
              var calculatedValue = scope.options.currentPage * scope.options.itemsPerPage;
              return (calculatedValue < scope.options.totalRecords ? calculatedValue : scope.options.totalRecords);
            };

            /**
             * Toggle the display of a column
             *
             * @param {number} key Number of the index (zero-based) of the column you wish to toggle display
             */
            scope.toggleColumnDisplay = function(key) {
              scope.options.columnModel[key].display = !scope.options.columnModel[key].display;
              autoResizeGridColumns();
            };

            /**
             * Toggle display of loading component
             *
             * @ngscope
             * @method toggleLoadingDisplay
             */
            scope.toggleLoadingDisplay = function() {
              scope.displayLoading = !scope.displayLoading;

              if(scope.displayLoading === true) {
                $(element).find('.grid-header').css('visibility', 'hidden');
                $(element).find('.grid-data').css('visibility', 'hidden');
                $(element).find('.grid-footer').css('visibility', 'hidden');
              } else {
                $(element).find('.grid-header').css('visibility', 'visible');
                $(element).find('.grid-data').css('visibility', 'visible');
                $(element).find('.grid-footer').css('visibility', 'visible');
              }
            }

            /**
             * Focus input event handler
             *
             * @todo: refactor: give more description name
             *
             * @ngscope
             * @method focusInput
             *
             * @param $event
             */
            scope.focusInput = function($event) {
              $event.target.select();
            }

            /**
             * Blur input event handler
             *
             * @todo: refactor: give more description name
             *
             * @ngscope
             * @method blurInput
             *
             * @param $event
             */
            scope.blurInput = function($event) {
              scope.options.currentPage = $($event.target).val();
            }

            /**
             * Mouseup input event handler
             *
             * @todo: refactor: give more description name, normalize like the other
             *
             * @ngscope
             * @method inputMouseUp
             *
             * @param $event
             */
            scope.inputMouseUp = function($event){
              $event.preventDefault();
            }

            /**
             * Keydown input event handler
             *
             * @todo: refactor: give more description name
             *
             * @ngscope
             * @method keyDownInput
             *
             * @param $event
             */
            scope.keyDownInput = function($event) {
              if($event.which === 13) {
                scope.options.currentPage = $($event.target).val();
              }
            }

            /**
             * Sort the grid data server side
             *
             * @ngscope
             * @method gridSort
             *
             * @param {object} $event Event
             * @param {string} property Name of the property to sort
             */
            scope.gridSort = function($event, property) {
              var fontIconClass, config, property, sortKey, clearSort, originalValue;
              config = ObjectArray.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

              clearSort = function() {
                for(sortKey in scope.options.sort) {
                  delete scope.options.sort[sortKey];
                }

                scope.sortOrder = [];
              }

              if(config.sortable) {
                property = config.property;
                if(scope.options.sort.hasOwnProperty(property)) {
                  originalValue = scope.options.sort[property];
                  if((scope.options.sortMulti !== true || $event.shiftKey !== true) && Object.keys(scope.options.sort).length > 0) {
                    clearSort();
                    scope.sortOrder.push(property);
                  }

                  scope.options.sort[property] = (originalValue === 'desc' ? 'asc' : 'desc');
                } else {
                  //lets see if we need to remove the other sort options
                  if((scope.options.sortMulti !== true || $event.shiftKey !== true) && Object.keys(scope.options.sort).length > 0) {
                    clearSort();
                  }

                  scope.options.sort[property] = 'asc';
                  scope.sortOrder.push(property);
                }

                $(element).find('.data .data-header .sortable').removeClass('sort-asc').removeClass('sort-desc');

                for(sortKey in scope.options.sort) {
                  fontIconClass = (scope.options.sort[sortKey] === 'asc' ? 'sort-asc' : 'sort-desc')
                  $(element).find('.data .data-header .' + sortKey + ' .sortable').addClass(fontIconClass);
                }

                if(scope.options.currentPage !== 1) {
                  scope.options.currentPage = 1;
                } else {
                  //if the page does not change, we still need to get the new data based on the new sort parameters
                  getData();
                }

                scope.options.selected.length = 0;
              }
            }

            /**
             * Retrieve the sort data
             *
             * @returns {array} Sorting data
             */
            scope.getSortArray = function() {
              var resultArray, x, property;
              resultArray = [];

              for(x = 0; x < scope.sortOrder.length; x += 1) {
                property = scope.sortOrder[x];
                resultArray.push(property + ' ' + scope.options.sort[property]);
              }

              return resultArray;
            }

            //for the initial load
            //scope.$watch('options.data', autoResizeGridColumns);

            //for updates to the data after the initial load
            /**
             * Auto resize the grid when the data changes
             *
             * @ngwatch options.data
             */
            scope.$watch('options.data', function(oldValue, newValue) {
              if(scope.options.data.length > 0) {
                $timeout(autoResizeGridColumns, 0);
              }
            });

            /**
             * Refresh the data set when the items per page changes
             *
             * @ngwatch options.itemsPerPage
             */
            scope.$watch('options.itemsPerPage', function(oldValue, newValue) {
              if(oldValue !== newValue) {
                if(scope.options.currentPage !== 1) {
                  scope.options.currentPage = 1;
                } else {
                  //if the page does not change, we still need to get the new data based on the new sort parameters
                  getData();
                }
              }
            });

            /**
             * Refresh the data set when the current page changes
             *
             * @ngwatch options.currentPage
             */
            scope.$watch('options.currentPage', function(oldValue, newValue) {
              if(!angular.isNumber(scope.options.currentPage) || scope.options.currentPage === 0) {
                scope.options.currentPage = 1;
              }

              $(element).find('.set-page-link').val(scope.options.currentPage);
              getData();
            });

            /**
             * Whether or not we are display the loading component
             *
             * @ngscope
             * @property {boolean} displayLoading
             */
            scope.displayLoading = false;

            /**
             * Unique id for the grid
             *
             * @ngscope
             * @property {mixed} id
             */
            scope.id = $('grid').length;

            /**
             * Sort order data
             *
             * @todo: refactor: put this into the options in order to be able to define default sort order
             *
             * @ngscope
             * @property {array} sortOrder
             */
            scope.sortOrder = [];

            $timeout(function(){
              $(element).find('.settings').css('top', $(element).find('.grid-header').outerHeight(true) + 5);
            }, 0);
          }
        };
      }/*,
      link: function(scope, element, attributes) {

      }*/
    }
  }
]);
