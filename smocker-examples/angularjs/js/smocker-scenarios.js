(function() {
  smocker.config({
    backendAdapter: 'angularjs',
    verbose: true
  });

  smocker.scenario('static-fixture', function() {
    this.get('/todos').redirectToFixture('test/fixtures/todos.json');
  });

  smocker.scenario('store-data', function() {
    var newTodosCounter = 100;
    this.get('/api').respondWith("OK");
    this.put(/\/todos\/\d+/).respondWith({ status: 204 });
    this.delete(/\/todos\/\d+/).respondWith({ status: 204 });
    this.post('/todos').respondWith(function(url, data, headers) {
      todo = JSON.parse(data);
      return {
        status: 201,
        content: { id: newTodosCounter++, title: todo.title, completed: todo.completed }
      }
    });
  });

  smocker.scenario('dynamic-fixture', function() {
    this.get('/todos').respondWith({
      content: [
        {id: 1, title: 'item 1', completed: false},
        {id: 2, title: 'item 2', completed: true},
        {id: 3, title: 'item 3', completed: false}
      ],
      delay: 2
    });
  });

  smocker.scenario('no_todos', function() {
    var newTodosCounter = 100;
    this.get('/api').respondWith("OK");
    this.get('/todos').respondWith({content: []});

    this.post('/todos').respondWith(function(url, content, headers) {
      todo = JSON.parse(content);
      if (todo.title != 'A Simple todo') {
        return {
          status: 400,
          content: 'Error. Unexpected request content: ' + content
        };
      }
      return {
        status: 201,
        content: {
          id: newTodosCounter++
        }
      };
    });
  });

  smocker.groupScenarios('scenario1', ['static-fixture', 'store-data']);
  smocker.groupScenarios('scenario2', ['dynamic-fixture', 'store-data']);

  var bootstrapModule = 'todomvc';

  var match = /[?&]smocker_scenario=(\w+)($|&.*)/.exec(window.location.search);
  if (match) {
    angular.module('todomvcTest', ['todomvc', 'smockerE2E']);
    var scenarioName = match[1];
    console.warn("Playing test scenario: " + scenarioName);
    smocker.play(scenarioName);
    bootstrapModule = 'todomvcTest';
  }

  angular.bootstrap(document, [bootstrapModule]);
})();
