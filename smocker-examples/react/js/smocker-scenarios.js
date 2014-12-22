(function() {
  smocker.config({
    verbose: true
  });

  smocker.scenario('static-fixture', function() {
    this.get('/todos').redirectToFixture('test/fixtures/todos.json');
  });

  smocker.scenario('store-data', function() {
    this.put('/todos').respondWith({ status: 204 });
  });

  smocker.scenario('load-templates', function() {
    this.get(/js\/.+\.jsx/).forwardToServer();
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

  smocker.scenario('no_todos', function() {
    this.get(/js\/.+\.jsx/).forwardToServer();
    this.get('/todos').respondWith({content: []});

    this.put('/todos').respondWith(function(url, content, headers) {
      if (content) {
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

  smocker.groupScenarios('scenario1', ['static-fixture', 'store-data', 'load-templates']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'store-data', 'load-templates']);

  var match = /[?&]test_scenario=(\w+)($|&.*)/.exec(window.location.search);
  if (match) {
    var scenarioName = match[1];
    console.warn("Playing test scenario: " + scenarioName);
    smocker.play(scenarioName);
  }
})();
