angular.module('app', [
  'httpMocker',
  'app.core',
  'app.home',
  'nag.grid'
])
.config([
  '$locationProvider',
  '$urlRouterProvider',
  function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/column-model-auto-width');
  }
])
.run([
  '$state',
  '$rootScope',
  'httpMocker',
  function($state, $rootScope, httpMocker) {
    httpMocker.register('GET', '/api/v1/users?itemsPerPage=3', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: {
        data: [{
          id: 1,
          firstName: 'Test',
          lastName: 'User1',
          username: 'testuser1'
        }, {
          id: 2,
          firstName: 'Test',
          lastName: 'User2',
          username: 'testuser2'
        }, {
          id: 3,
          firstName: 'Test',
          lastName: 'User3',
          username: 'testuser3'
        }],
        meta: {
          totalRecords: 7
        }
      }
    }), {
      statusCode: 200
    });
    httpMocker.register('GET', '/api/v1/users?itemsPerPage=3&offset=3', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: {
        data: [{
          id: 4,
          firstName: 'Test',
          lastName: 'User4',
          username: 'testuser4'
        }, {
          id: 5,
          firstName: 'Test',
          lastName: 'User5',
          username: 'testuser5'
        }, {
          id: 6,
          firstName: 'Test',
          lastName: 'User6',
          username: 'testuser6'
        }],
        meta: {
          totalRecords: 7
        }
      }
    }), {
      statusCode: 200
    });
    httpMocker.register('GET', '/api/v1/users?itemsPerPage=3&offset=6', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: {
        data: [{
          id: 7,
          firstName: 'Test',
          lastName: 'User7',
          username: 'testuser7'
        }],
        meta: {
          totalRecords: 7
        }
      }
    }), {
      statusCode: 200
    });
    httpMocker.register('GET', '/api/v1/users?itemsPerPage=4', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: {
        data: [{
          id: 1,
          firstName: 'Test',
          lastName: 'User1',
          username: 'testuser1'
        }, {
          id: 2,
          firstName: 'Test',
          lastName: 'User2',
          username: 'testuser2'
        }, {
          id: 3,
          firstName: 'Test',
          lastName: 'User3',
          username: 'testuser3'
        }, {
          id: 4,
          firstName: 'Test',
          lastName: 'User4',
          username: 'testuser4'
        }],
        meta: {
          totalRecords: 7
        }
      }
    }), {
      statusCode: 200
    });
    httpMocker.register('GET', '/api/v1/users?itemsPerPage=4&offset=4', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: {
        data: [{
          id: 5,
          firstName: 'Test',
          lastName: 'User5',
          username: 'testuser5'
        }, {
          id: 6,
          firstName: 'Test',
          lastName: 'User6',
          username: 'testuser6'
        }, {
          id: 7,
          firstName: 'Test',
          lastName: 'User7',
          username: 'testuser7'
        }],
        meta: {
          totalRecords: 7
        }
      }
    }), {
      statusCode: 200
    });
    httpMocker.register('GET', '/api/v1/users_custom_response?itemsPerPage=3', JSON.stringify({
      status: "success",
      httpStatusCode: 200,
      data: [{
        id: 1,
        firstName: 'Test',
        lastName: 'User1',
        username: 'testuser1'
      }, {
        id: 2,
        firstName: 'Test',
        lastName: 'User2',
        username: 'testuser2'
      }, {
        id: 3,
        firstName: 'Test',
        lastName: 'User3',
        username: 'testuser3'
      }],
      totalRecords: 3
    }), {
      statusCode: 200
    });
  }
]);
