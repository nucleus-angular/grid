module.exports = {
  name: 'grid',

  'should load data': function(test) {
    test.open('http://localhost:3000/column-model-auto-width')
    .wait(1500)
    .assert.text('.grid .data-header .cell[data-property="id"] .content', 'ID', 'id header has correct text')
    .assert.text('.grid .data-header .cell[data-property="firstName"] .content', 'First Name', 'first name header has correct text')
    .assert.text('.grid .data-header .cell[data-property="lastName"] .content', 'Last Name', 'last name header has correct text')
    .assert.text('.grid .data-header .cell[data-property="username"] .content', 'Username', 'username header has correct text')
    .assert.text('.grid .record:nth-child(2) .cell[data-property="id"] .content', '1', 'id header has correct text')
    .assert.text('.grid .record:nth-child(2) .cell[data-property="firstName"] .content', 'Test', 'first name header has correct text')
    .assert.text('.grid .record:nth-child(2) .cell[data-property="lastName"] .content', 'User1', 'last name header has correct text')
    .assert.text('.grid .record:nth-child(2) .cell[data-property="username"] .content', 'testuser1', 'username header has correct text')
    .done();
  },

  'should render controls': function(test) {
    test.open('http://localhost:3000/column-model-auto-width')
    .wait(1500)
    //todo
    .done();
  },

  'column model should automatically set column width': function(test) {
    test.open('http://localhost:3000/column-model-auto-width')
    .wait(1500)
      .assert.css('.grid .row:nth-child(1) .cell[data-property="id"] .content', 'width', '50px', 'id content width is 50px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="firstName"] .content', 'width', '85px', 'first name content width is 85px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="lastName"] .content', 'width', '84px', 'last name content width is 84px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="username"] .content', 'width', '80px', 'username content width is 80px first row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="id"] .content', 'width', '50px', 'id content width is 50px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="firstName"] .content', 'width', '85px', 'first name content width is 85px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="lastName"] .content', 'width', '84px', 'last name content width is 84px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="username"] .content', 'width', '80px', 'username content width is 80px last row')
    .done();
  },

  'column model should display the id column on load': function(test) {
    test.open('http://localhost:3000/column-model-display-id-on-load')
    .wait(1500)
      .assert.numberOfVisibleElements('.grid .cell[data-property="id"]', 4, 'id column displayed')
    .done();
  },

  'column model should not display the id column on load': function(test) {
    test.open('http://localhost:3000/column-model-display-id-on-load')
    .wait(1500)
      .assert.numberOfVisibleElements('.grid .cell[data-property="id"]', 0, 'id column not displayed')
    .done();
  },

  'column model id should have a max width of 20px': function(test) {
    test.open('http://localhost:3000/column-model-id-max-width')
    .wait(1500)
      .assert.css('.grid .cell[data-property="id"] .content', 'width', '20px', 'id content width is 20px')
      //todo: verify that attempting to resize the element can not make it bigger than 20px
    .done();
  },

  'column model id should have a min width of 150px': function(test) {
    test.open('http://localhost:3000/column-model-id-min-width')
    .wait(1500)
      .assert.css('.grid .cell[data-property="id"] .content', 'width', '150px', 'id content width is 150px')
    //todo: verify that attempting to resize the element can not make it smaller than 150px
    .done();
  },

  'column model id should not be resizable': function(test) {
    test.open('http://localhost:3000/column-model-id-not-resizable')
    .wait(1500)
      .assert.doesntExist('.grid .cell[data-property="id"] .ui-resizable-handle', 'resizable handle not rendered')
    .done();
  },

  'column model id should not be sortable': function(test) {
    test.open('http://localhost:3000/column-model-id-not-sortable')
    .wait(1500)
      .assert.doesntExist('.grid .cell[data-property="id"] .content.sortable', 'sortable container not rendered')
    .done();
  },

  'column model id should be resizable': function(test) {
    test.open('http://localhost:3000/column-model-id-resizable')
    .wait(1500)
      .assert.exists('.grid .cell[data-property="id"] .ui-resizable-handle', 'resizable handle rendered')
    .done();
  },

  'column model id should be sortable': function(test) {
    test.open('http://localhost:3000/column-model-id-sortable')
    .wait(1500)
      .assert.exists('.grid .cell[data-property="id"] .content.sortable', 'sortable container rendered')
    .done();
  },

  'column model id should set the width to 300px': function(test) {
    test.open('http://localhost:3000/column-model-id-set-width')
    .wait(1500)
      .assert.css('.grid .cell[data-property="id"] .content', 'width', '300px', 'id content width is 300px')
    //todo: verify that attempting to resize the element can make it bigger than 300px
    //todo: verify that attempting to resize the element can make it smaller than 300px
    .done();
  },

  'should load data': function(test) {
    test.open('http://localhost:3000/custom-response')
    .wait(1500)
      .assert.text('.grid .data-header .cell[data-property="id"] .content', 'ID', 'id header has correct text')
      .assert.text('.grid .data-header .cell[data-property="firstName"] .content', 'First Name', 'first name header has correct text')
      .assert.text('.grid .data-header .cell[data-property="lastName"] .content', 'Last Name', 'last name header has correct text')
      .assert.text('.grid .data-header .cell[data-property="username"] .content', 'Username', 'username header has correct text')
      .assert.text('.grid .record:nth-child(2) .cell[data-property="id"] .content', '1', 'id header has correct text')
      .assert.text('.grid .record:nth-child(2) .cell[data-property="firstName"] .content', 'Test', 'first name header has correct text')
      .assert.text('.grid .record:nth-child(2) .cell[data-property="lastName"] .content', 'User1', 'last name header has correct text')
      .assert.text('.grid .record:nth-child(2) .cell[data-property="username"] .content', 'testuser1', 'username header has correct text')
    .done();
  },

  'should have actions column': function(test) {
    test.open('http://localhost:3000/has-actions')
    .wait(1500)
      .assert.numberOfVisibleElements('.grid .cell.grid-actions-column', 4, 'has actions column')
    .done();
  },

  'should have not actions column': function(test) {
    test.open('http://localhost:3000/no-actions')
    .wait(1500)
      .assert.doesntExist('.grid .cell.grid-actions-column', 'has no actions column')
    .done();
  },

  'should load page 3 on load': function(test) {
    test.open('http://localhost:3000/load-page-3-on-load')
    .wait(1500)
      .assert.numberOfVisibleElements('.grid .row', 2, '2 row rendered')
      .assert.val('.grid .controls input', 3, 'showing page 3')
    .done();
  },

  'should have max column width of 35': function(test) {
    test.open('http://localhost:3000/max-column-width')
    .wait(1500)
      .assert.css('.grid .row:nth-child(1) .cell[data-property="id"] .content', 'width', '35px', 'id content width is 35px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="firstName"] .content', 'width', '35px', 'first name content width is 35px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="lastName"] .content', 'width', '35px', 'last name content width is 35px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="username"] .content', 'width', '35px', 'username content width is 35px first row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="id"] .content', 'width', '35px', 'id content width is 35px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="firstName"] .content', 'width', '35px', 'first name content width is 35px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="lastName"] .content', 'width', '35px', 'last name content width is 35px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="username"] .content', 'width', '35px', 'username content width is 35px last row')
    .done();
  },

  'should have max column width of 150': function(test) {
    test.open('http://localhost:3000/min-column-width')
    .wait(1500)
      .assert.css('.grid .row:nth-child(1) .cell[data-property="id"] .content', 'width', '150px', 'id content width is 150px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="firstName"] .content', 'width', '150px', 'first name content width is 150px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="lastName"] .content', 'width', '150px', 'last name content width is 150px first row')
      .assert.css('.grid .row:nth-child(1) .cell[data-property="username"] .content', 'width', '150px', 'username content width is 150px first row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="id"] .content', 'width', '150px', 'id content width is 150px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="firstName"] .content', 'width', '150px', 'first name content width is 150px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="lastName"] .content', 'width', '150px', 'last name content width is 150px last row')
      .assert.css('.grid .row:nth-child(4) .cell[data-property="username"] .content', 'width', '150px', 'username content width is 150px last row')
    .done();
  },

  'should have max column width of 150': function(test) {
    test.open('http://localhost:3000/multi-select-row')
    .wait(1500)
    .click('.grid .row:nth-child(2)')
    .click('.grid .row:nth-child(3)')
      .assert.numberOfVisibleElements('.grid .row.selected', 2, '2 rows selected')
    .done();
  },

  'should select all record when clicking the checkbox header': function(test) {
    test.open('http://localhost:3000/multi-select-row')
    .wait(1500)
    .click('.grid .row:nth-child(1) li:first-child input')
      .assert.numberOfVisibleElements('.grid .row.selected', 3, '3 rows selected')
    .done();
  },

  'should not select multiple keyboards unless the alt key is being pressed': function(test) {
    test.open('http://localhost:3000/multi-select-row-with-keyboard')
    //.wait(1500)
    //todo: need to figure out how to keep a key pressed
    .done();
  },

  'should be able to sorting on multiple fields': function(test) {
    test.open('http://localhost:3000/multi-sorting')
    //.wait(1500)
    //todo: need to figure out how to keep a key pressed
    .done();
  },

  'should not show settings toggle': function(test) {
    test.open('http://localhost:3000/no-settings-toggle')
    .wait(1500)
      .assert.doesntExist('.grid-header .settings', 'settings toggle not showing')
    .done();
  },

  'should show settings toggle': function(test) {
    test.open('http://localhost:3000/show-settings-toggle')
    .wait(1500)
      .assert.visible('.grid-header .settings', 'settings toggle not showing')
    .done();
  },

  'should show selection checkboxes': function(test) {
    test.open('http://localhost:3000/select-row-with-checkboxes')
    .wait(1500)
      .assert.numberOfVisibleElements('.grid input[type="checkbox"]', 4, 'selection checkboxes are shown')
    .done();
  },

  'should not show selection checkboxes': function(test) {
    test.open('http://localhost:3000/select-row-without-checkboxes')
    .wait(1500)
      .assert.doesntExist('.grid .data input[type="checkbox"]', 'selection checkboxes not shown')
    .done();
  },

  'should select record when clicking checkbox': function(test) {
    test.open('http://localhost:3000/selection-mode-checkbox')
    .wait(1500)
    .click('.grid .data .cell.id')
      .assert.doesntExist('.grid .data input[type="checkbox"]:checked', 'no checked selection checkboxes')
    .click('.grid .data input[type="checkbox"]')
      .assert.numberOfVisibleElements('.grid .data input[type="checkbox"]:checked', 4, '4 checked selection checkboxes')
    .done();
  },

  'should select record when clicking anywhere in the row': function(test) {
    test.open('http://localhost:3000/selection-mode-row')
    .wait(1500)
    .click('.grid .data .row:nth-child(2) .cell.id')
    .click('.grid .data .row:nth-child(3) .cell.id')
    .click('.grid .data .row:nth-child(4) .cell.id')
      .assert.numberOfVisibleElements('.grid .data input[type="checkbox"]:checked', 4, '4 checked selection checkboxes')
    .done();
  },

  'should only be able to select one row at any given time': function(test) {
    test.open('http://localhost:3000/single-row-select')
    .wait(1500)
    .click('.grid .data .row:nth-child(2) .cell.id')
      .assert.numberOfVisibleElements('.grid .data input[type="checkbox"]:checked', 1, '1 checked selection checkboxes')
    .click('.grid .data .row:nth-child(3) .cell.id')
      .assert.numberOfVisibleElements('.grid .data input[type="checkbox"]:checked', 1, '1 checked selection checkboxes')
      .assert.visible('.grid .data input[type="checkbox"]:checked', 1, 'second record selected')
    .click('.grid .data .row:nth-child(1) input[type="checkbox"]')
      .assert.numberOfVisibleElements('.grid .data input[type="checkbox"]:checked', 1, '1 checked selection checkboxes')
      .assert.visible('.grid .data input[type="checkbox"]:checked', 1, 'second record selected')
    .done();
  },

  'should only be able to sort by one field at a time': function(test) {
    test.open('http://localhost:3000/single-sorting')
    .wait(1500)
    .click('.grid .data .data-header .cell.firstName')
    .wait(1500)
      .assert.visible('.grid .data .data-header .cell.firstName .sortable.sort-asc', 'sorting in asc order')
    .click('.grid .data .data-header .cell.firstName')
    .wait(1500)
    . assert.visible('.grid .data .data-header .cell.firstName .sortable.sort-desc', 'sorting in desc order')
    .done();
  }
}