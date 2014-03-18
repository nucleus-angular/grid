
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
 * @module nag.grid
 * @ngdirective nagGrid
 *
 * @nghtmlattribute {object} nag-grid Tells AngularJS this element is a grid component and object pased in overwrite defaults for $scope.options
 */
angular.module('nag.grid')
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
            scope.options = nagDefaults.getOptions('gridOptions', scope.options);

            var html = $(nagHelper.getAsyncTemplate(nagHelper.getTemplatePath('grid'), scope.options));
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
                  var columnModel = utilities.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

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
                    var columnModel = utilities.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

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
                        $(element).find('.data .row .cell.' + columnModel.property).width(ui.size.width);
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
                    if(_.isFunction(scope.options.parseResponse)) {
                      var processedData = (scope.options.parseResponse(data));
                      scope.options.data = processedData.data;
                      scope.options.totalRecords = processedData.totalRecords
                    } else {
                      scope.options.data = data.data.data;
                      scope.options.totalRecords = data.data.meta.totalRecords;
                    }
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
             * @param {string} selectionMode The mode of the selection active for the grid
             */
            scope.toggleRecordSelection = function($event, recordNumber, selectionMode) {
              if(selectionMode === scope.options.selectionMode) {
                recordNumber += 1;

                if(scope.options.selected.indexOf(recordNumber) === -1) {
                  if(scope.options.rowMultiSelect !== true || (scope.options.rowKeyboardMultiSelect === true && $event.altKey !== true)) {
                    scope.options.selected = [];
                  }

                  scope.options.selected.push(recordNumber);
                } else {
                  scope.options.selected.splice(scope.options.selected.indexOf(recordNumber), 1);
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
              config = utilities.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

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
                  if((scope.options.multiSorting !== true || $event.altKey !== true) && Object.keys(scope.options.sort).length > 0) {
                    clearSort();
                    scope.sortOrder.push(property);
                  }

                  scope.options.sort[property] = (originalValue === 'desc' ? 'asc' : 'desc');
                } else {
                  //lets see if we need to remove the other sort options
                  if((scope.options.multiSorting !== true || $event.altKey !== true) && Object.keys(scope.options.sort).length > 0) {
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
