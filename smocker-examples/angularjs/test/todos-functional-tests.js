module("Todos list", {});

test("creating a todo item", function() {
  F.open('index.html?smocker_scenario=no_todos');

  F('#new-todo').visible(function() {
    this.type('A Simple todo [enter]');
    F("#todo-list li").visible(function() {
      equal(this.length, 1, 'There is 1 todo');
    });
  });
});

test("showing all todos returned from server", function() {
  F.open('index.html?smocker_scenario=scenario1');

  F("#todo-list li").visible(function() {
    equal(this.length, 3, "There are 3 todo items");
    F('#todo-list li:nth-of-type(1) label:contains("item 1")').visible('Todo #1 has title "item 1"');
    F('#todo-list li:nth-of-type(1) .toggle:not(:checked)').visible('Todo #1 is not completed');
    F('#todo-list li:nth-of-type(2) label:contains("item 2")').visible('Todo #2 has title "item 2"');
    F('#todo-list li:nth-of-type(2) .toggle:checked').visible('Todo #2 is completed');
    F('#todo-list li:nth-of-type(3) label:contains("item 3")').visible('Todo #3 has title "item 3"');
    F('#todo-list li:nth-of-type(3) .toggle:not(:checked)').visible('Todo #3 is not completed');
  });
});

test("filtering todos", function() {
  F.open('index.html?smocker_scenario=scenario1');

  F('#filters a:contains("Active")').click();
  F('#todo-list li label:contains("item 1")').visible('Item 1 is shown in the "active" view');
  F('#todo-list li label:contains("item 2")').invisible('Item 2 is not shown in the "active" view');
  F('#todo-list li label:contains("item 3")').visible('Item 3 is shown in the "active" view');

  F('#filters a:contains("Completed")').click();
  F('#todo-list li label:contains("item 1")').invisible('Item 1 is not shown in the "completed" view');
  F('#todo-list li label:contains("item 2")').visible('Item 2 is shown in the "completed" view');
  F('#todo-list li label:contains("item 3")').invisible('Item 3 is not shown in the "completed" view');

  F('#filters a:contains("All")').click();
  F('#todo-list li label:contains("item 1")').visible('Item 1 is shown in the "all" view');
  F('#todo-list li label:contains("item 2")').visible('Item 2 is shown in the "all" view');
  F('#todo-list li label:contains("item 3")').visible('Item 3 is shown in the "all" view');
});
