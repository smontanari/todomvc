(function() {
  smocker.config({
    backendAdapter: 'angularjs',
    verbose: true
  });

  smocker.scenario('static-fixture', function() {
    this.get('/todos').redirectToFixture('test/fixtures/todos.json');
  });

  smocker.scenario('common', function() {
    this.put('/todos').respondWith({ status: 204 });
  });

  smocker.scenario('dynamic-fixture', function() {
    this.get('/todos').respondWith({
      status: 200,
      headers: {'Content-Type': 'application/json'},
      content: [
        {id: 1, title: 'something to do', completed: false},
        {id: 2, title: 'something done', completed: true}
      ],
      delay: 2
    });
  });

  smocker.groupScenarios('scenario1', ['static-fixture', 'common']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'common']);
  smocker.play('scenario2');

  angular.module('todomvcTest', ['todomvc', 'smockerE2E']);

  angular.bootstrap(document, ['todomvcTest']);
})();
