(function() {
  smocker.config({
    backendAdapter: "canjs",
    verbose: true
  });

  smocker.scenario('static-fixture', function() {
    this.get('/todos').redirectToFixture('test/fixtures/todos.json');
  });

  smocker.scenario('store-data', function() {
    var newTodosCounter = 100;
    this.put('/todos/{id}').respondWith({ status: 204 });
    this.delete('/todos/{id}').respondWith({ status: 204 });
    this.post('/todos').respondWith(function(url, data, headers) {
      return {
        status: 201,
        content: { id: newTodosCounter++, title: data.title, completed: data.completed }
      };
    });
  });

  smocker.scenario('dynamic-fixture', function() {
    this.get('/todos').respondWith({
      content: [
        {id: 1, text: 'item 1', complete: false},
        {id: 2, text: 'item 2', complete: true},
        {id: 3, text: 'item 3', complete: false}
      ],
      delay: 2
    });
  });

  smocker.scenario('no_todos', function() {
    this.get('/todos').respondWith({content: []});

    this.post('/todos').respondWith(function(url, content, headers) {
      todo = content;
      if (todo.text != 'A Simple todo') {
        return {
          status: 400,
          content: 'Error. Unexpected request content: ' + content
        }
      }
      return {status: 204}
    });
  });

  smocker.groupScenarios('scenario1', ['static-fixture', 'store-data']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'store-data']);

  var match = /[?&]smocker_scenario=(\w+)($|&.*)/.exec(window.location.search);
  if (match) {
    var scenarioName = match[1];
    console.warn("Playing test scenario: " + scenarioName);
    smocker.play(scenarioName);
  }
})();
