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
    equal(this.length, 3);
    F('#todo-list li:nth-of-type(1) label:contains("item 1")').visible();
    F('#todo-list li:nth-of-type(1) .toggle:not(:checked)').visible();
    F('#todo-list li:nth-of-type(2) label:contains("item 2")').visible();
    F('#todo-list li:nth-of-type(2) .toggle:checked').visible();
    F('#todo-list li:nth-of-type(3) label:contains("item 3")').visible();
    F('#todo-list li:nth-of-type(3) .toggle:not(:checked)').visible();
  });
});

test("filtering todos", function() {
  F.open('index.html?test_scenario=scenario1');

  F('#filters a:contains("Active")').click();
  F('#todo-list li label:contains("item 2")').invisible('active view');
  F('#todo-list li label:contains("item 1")').visible('active view');
  F('#todo-list li label:contains("item 3")').visible('active view');

  F('#filters a:contains("Completed")').click();
  F('#todo-list li label:contains("item 1")').invisible('completed view');
  F('#todo-list li label:contains("item 3")').invisible('completed view');
  F('#todo-list li label:contains("item 2")').visible('completed view');

  F('#filters a:contains("All")').click();
  F('#todo-list li label:contains("item 1")').visible('all view');
  F('#todo-list li label:contains("item 2")').visible('all view');
  F('#todo-list li label:contains("item 3")').visible('all view');
});