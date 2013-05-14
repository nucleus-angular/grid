/**
 * todo: features to add
 * todo: filtering
 * todo: row reordering
 * todo: handle data loading error gracefully
 *
 * IDEAS TO THINK ABOUT
 *
 * todo: think: should we have abbr tags to display full value if part of data is being hidden?
 * todo: think: should we have disable normal text selection and add other functionality that makes is easier to select the data from a cell when row selection is on?
 * todo: think: should we have either or both hitting esc of clicking outside the column-selection area hide it is the column selection area is showing?
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
            scope.options = nagDefaults.getGridOptions(scope.options);

            var html = $(nagHelper.getAsyncTemplate(scope.options.templateUrl));
            $(element).append($compile(html)(scope));

            $(element).addClass('nag-grid');
          },
          post: function(scope, element, attributes) {
            var autoResizeGridColumns, resizableGrid, getData;
            autoResizeGridColumns = function() {
              var minWidth;
              var columnCount = $(element).find('.nag-data .nag-data-header .nag-cell').length;

              for(var x = 0; x <= columnCount; x += 1) {
                var property = $(element).find('.nag-data .nag-data-header .nag-cell:eq(' + x + ')').data('property');

                if(property) {
                  var columnModel = ObjectArray.getObjectByPropertyValue(scope.options.columnModel, 'property', property);

                  if(columnModel.width === 0) {
                    minWidth = (scope.options.minColumnWidth >= columnModel.minWidth ? scope.options.minColumnWidth : columnModel.minWidth);
                    var maxWidth = (scope.options.maxColumnWidth >= columnModel.maxWidth ? scope.options.maxColumnWidth : columnModel.maxWidth);
                    var $cells = $(element).find('.nag-data .nag-row .nag-cell.' + columnModel.property);

                    $.each($cells, function(key, value) {
                      minWidth = (minWidth < $(value).width() ? $(value).width() : minWidth);
                    });

                    if(maxWidth > 0 && minWidth > maxWidth) {
                      minWidth = maxWidth;
                    }
                  } else {
                    minWidth = columnModel.width;
                  }

                  $(element).find('.nag-data .nag-row .nag-cell.' + columnModel.property).width(minWidth);
                } else if ($(element).find('.nag-data .nag-data-header .nag-cell:eq(' + x + ')').hasClass('nag-grid-actions-column')) {
                  minWidth = 0;
                  var $cells = $(element).find('.nag-data .nag-row .nag-cell.nag-grid-actions-column');

                  $.each($cells, function(key, value) {
                    minWidth = (minWidth < $(value).width() ? $(value).width() : minWidth);
                  });

                  $(element).find('.nag-data .nag-row .nag-cell.nag-grid-actions-column').width(minWidth);
                }
              }

              resizableGrid();

              if(scope.displayLoading) {
                scope.toggleLoadingDisplay();
              }
            };

            scope.autoResize = autoResizeGridColumns;

            resizableGrid = function() {
              angular.forEach($(element).find('.nag-data .nag-row'), function(row, key) {
                angular.forEach($(row).find('.nag-cell'), function(cell, key) {
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

                      $(element).find('.nag-data .nag-row .nag-cell.' + columnModel.property).resizable({
                        handles: 'e',
                        minWidth: minWidth,
                        maxWidth: maxWidth
                      });
                      $(cell).resize(function() {
                        $(element).find('.nag-data .nag-row .nag-cell.' + columnModel.property).width($(this).width());
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
                  console.log(data);
                  scope.toggleLoadingDisplay();
                  //todo: proper error handling
                });
              }, 500);
            };

            scope.isRecordSelected = function(recordNumber) {
              recordNumber += 1;

              return (scope.options.selected.indexOf(recordNumber) !== -1);
            }

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

            scope.areAllRecordsSelected = function() {
              return (scope.options.data.length > 0 && scope.options.selected.length === scope.options.data.length);
            }

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

            scope.decreaseCurrentPage = function() {
              scope.options.currentPage = (scope.options.currentPage - 1 > 1 ? scope.options.currentPage - 1 : 1);
            };

            scope.increaseCurrentPage = function() {
              scope.options.currentPage = (scope.options.currentPage + 1 < scope.getMaxPage() ? scope.options.currentPage + 1 : scope.getMaxPage());
            };

            scope.getMaxPage = function() {
              return Math.ceil(scope.options.totalRecords / scope.options.itemsPerPage);
            };

            scope.getEndingRecordNumber = function() {
              var calculatedValue = scope.options.currentPage * scope.options.itemsPerPage;
              return (calculatedValue < scope.options.totalRecords ? calculatedValue : scope.options.totalRecords);
            };

            scope.toggleColumnDisplay = function(key) {
              scope.options.columnModel[key].display = !scope.options.columnModel[key].display;
              autoResizeGridColumns();
            };

            scope.toggleLoadingDisplay = function(forcedStatus) {
              scope.displayLoading = !scope.displayLoading;

              if(scope.displayLoading === true) {
                $(element).find('.nag-grid-header').css('visibility', 'hidden');
                $(element).find('.nag-grid-data').css('visibility', 'hidden');
                $(element).find('.nag-grid-footer').css('visibility', 'hidden');
              } else {
                $(element).find('.nag-grid-header').css('visibility', 'visible');
                $(element).find('.nag-grid-data').css('visibility', 'visible');
                $(element).find('.nag-grid-footer').css('visibility', 'visible');
              }
            }

            scope.focusInput = function($event) {
              $event.target.select();
            }

            scope.blurInput = function($event) {
              scope.options.currentPage = $($event.target).val();
            }

            scope.inputMouseUp = function($event){
              $event.preventDefault();
            }

            scope.keyDownInput = function($event) {
              if($event.which === 13) {
                scope.options.currentPage = $($event.target).val();
              }
            }

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

                $(element).find('.nag-data .nag-data-header .nag-sortable').removeClass('nag-sort-asc').removeClass('nag-sort-desc');

                for(sortKey in scope.options.sort) {
                  fontIconClass = (scope.options.sort[sortKey] === 'asc' ? 'nag-sort-asc' : 'nag-sort-desc')
                  $(element).find('.nag-data .nag-data-header .' + sortKey + ' .nag-sortable').addClass(fontIconClass);
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

            //return the sorting data in an array in the correct order
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
            scope.$watch('options.data', function(oldValue, newValue) {
              if(scope.options.data.length > 0) {
                $timeout(autoResizeGridColumns, 0);
              }
            });

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

            scope.$watch('options.currentPage', function(oldValue, newValue) {
              if(!angular.isNumber(scope.options.currentPage) || scope.options.currentPage === 0) {
                scope.options.currentPage = 1;
              }

              $(element).find('.nag-set-page-link').val(scope.options.currentPage);
              getData();
            });

            scope.displayLoading = false;
            scope.id = $('nag-grid').length;
            scope.sortOrder = [];

            $timeout(function(){
              $(element).find('.nag-settings-widget').css('top', $(element).find('.nag-grid-header').outerHeight(true) + 5);
            }, 0);
          }
        };
      }/*,
      link: function(scope, element, attributes) {

      }*/
    }
  }
]);
