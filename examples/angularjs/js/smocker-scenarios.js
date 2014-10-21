smocker.config({
  backendAdapter: 'angularjs',
  verbose: true
});

smocker.play(function() {
  this.get('/todos').respondWith({
    status: 200,
    headers: {'Content-Type': 'application/json'},
    content: [
      {id: 1, title: 'something to do', completed: false},
      {id: 2, title: 'something done', completed: true}
    ]
  });

  this.put('/todos').respondWith({ status: 204 });
});

angular.module('todomvcTest', ['todomvc', 'smockerE2E']);

angular.bootstrap(document, ['todomvcTest']);
