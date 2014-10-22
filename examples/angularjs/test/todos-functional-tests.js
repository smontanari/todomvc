module("Todos list", {});

test("creating a todo item", function() {
  F.open('index.html?test_scenario=no_todos');

  F('#new-todo').visible(function() {
    this.type('A Simple todo [enter]');
    F("#todo-list li").visible(function() {
      equal(this.length, 1);
    });
  });
});

test("showing all todos returned from server", function() {
  F.open('index.html?test_scenario=scenario1');

  F("#todo-list li").visible(function() {
    equal(this.length, 2);
    F('#todo-list li:nth-child(1) label:contains("something to do")').visible();
    F('#todo-list li:nth-child(1) .toggle:not(:checked)').visible();
    F('#todo-list li:nth-child(2) label:contains("something done")').visible();
    F('#todo-list li:nth-child(2) .toggle:checked').visible();
  });
});

test("filtering todos", function() {
  F.open('index.html?test_scenario=scenario1');

  F('#filters a:contains("Active")').click();
  F('#todo-list li label:contains("something done")').invisible('active view');
  F('#todo-list li label:contains("something to do")').visible('active view');

  F('#filters a:contains("Completed")').click();
  F('#todo-list li label:contains("something to do")').invisible('completed view');
  F('#todo-list li label:contains("something done")').visible('completed view');

  F('#filters a:contains("All")').click();
  F('#todo-list li label:contains("something to do")').visible('all view');
  F('#todo-list li label:contains("something done")').visible('all view');
});
