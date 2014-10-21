angular.module('todomvc')
  .factory('todoCollection', ['$resource', function ($resource) {
    return $resource('/todos', null, {
      'update': { method:'PUT' }
    });
}]);
