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

  smocker.scenario('no_todos', function() {
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

  smocker.groupScenarios('scenario1', ['static-fixture', 'common']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'common']);

  var bootstrapModule = 'todomvc';

  var match = /[?&]test_scenario=(\w+)($|&.*)/.exec(window.location.search);
  if (match) {
    angular.module('todomvcTest', ['todomvc', 'smockerE2E']);
    var scenarioName = match[1];
    console.warn("Playing test scenario: " + scenarioName);
    smocker.play(scenarioName);
    bootstrapModule = 'todomvcTest';
  }

  angular.bootstrap(document, [bootstrapModule]);
})();
