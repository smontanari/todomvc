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
      },
      delay: 1
    });
  });

  smocker.scenario('no_todos', function() {
    this.get('/todos').respondWith({content: {todos: []}});

    this.put('/todos').respondWith(function(url, content, headers) {
      if (content) {
        console.log(content)
        data = JSON.parse(content);
        if (data.length == 1 && data[0].title != 'A Simple todo') {
          return {
            status: 400,
            headers: {'Content-Type': 'text/plain'},
            content: 'Error. Unexpected request content: ' + content
          }
        }
      }
      return {status: 204}
    });
  });

  smocker.groupScenarios('scenario1', ['static-fixture', 'store-data']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'store-data']);

  var match = /[?&]test_scenario=(\w+)($|&.*)/.exec(window.location.search);
  if (match) {
    var scenarioName = match[1];
    console.warn("Playing test scenario: " + scenarioName);
    smocker.play(scenarioName);
  }
})();