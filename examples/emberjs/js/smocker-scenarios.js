(function() {
  smocker.config({
    verbose: true
  });

  smocker.scenario('static-fixture', function() {
    this.get('/todos').redirectToFixture('test/fixtures/todos.json');
  });

  smocker.scenario('store-data', function() {
    this.post('/todos').respondWith({ status: 201 });
    this.put(/\/todos(\/\d+)?/).respondWith({ status: 204 });
  });

  smocker.scenario('dynamic-fixture', function() {
    this.get('/todos').respondWith({
      status: 200,
      headers: {'Content-Type': 'application/json'},
      content: {
        todos: [
          {id: "1", title: 'something to do', isCompleted: false},
          {id: "2", title: 'something done', isCompleted: true}
        ]
      }
    });
  });

  smocker.groupScenarios('scenario1', ['static-fixture', 'store-data']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'store-data']);

  smocker.play('scenario2');
})();