/* global can */
(function (namespace) {
	'use strict';

	var ESCAPE_KEY = 27;

	var component = {
		// Create this component on a tag  like `<todo-app>`.
		tag: 'todo-app',
		scope: {
			// Store the Todo model in the scope
			Todo: namespace.Models.Todo,
			// A list of all Todos retrieved from LocalStorage
			todos: new namespace.Models.Todo.List(),
			// Edit a Todo
			edit: function (todo, el) {
				todo.attr('editing', true);
				el.parents('.todo').find('.edit').focus();
			},
			cancelEditing: function (todo, el, ev) {
				if (ev.which === ESCAPE_KEY) {
					el.val(todo.attr('text'));
					todo.attr('editing', false);
				}
			},
			// Returns a list of Todos filtered based on the route
			displayList: function () {
				var filter = can.route.attr('filter');
				return this.todos.filter(function (todo) {
					if (filter === 'completed') {
						return todo.attr('complete');
					}

					if (filter === 'active') {
						return !todo.attr('complete');
					}

					return true;
				});
			},
			updateTodo: function (todo, el) {
				var value = can.trim(el.val());

				if (value === '') {
					todo.destroy();
				} else {
					todo.attr({
						editing: false,
						text: value
					});
				}
			},
			createTodo: function (context, el) {
				var value = can.trim(el.val());
				var TodoModel = this.Todo;

				if (value !== '') {
					new TodoModel({
						text: value,
						complete: false
					}).save();

					can.route.removeAttr('filter');
					el.val('');
				}
			},
			toggleAll: function (scope, el) {
				var toggle = el.prop('checked');
				this.attr('todos').each(function (todo) {
					todo.attr('complete', toggle);
				});
			},
			clearCompleted: function () {
				this.attr('todos').completed().forEach(function (todo) {
					todo.destroy();
				});
			}
		},
		events: {
			// When a new Todo has been created, add it to the todo list
			'{Todo} created': function (Construct, ev, todo) {
				this.scope.attr('todos').push(todo);
			}
		},
		helpers: {
			link: function (name, filter) {
				var data = filter ? { filter: filter } : {};
				return can.route.link(name, data, {
					className: can.route.attr('filter') === filter ? 'selected' : ''
				});
			},
			plural: function (singular, num) {
				return num() === 1 ? singular : singular + 's';
			}
		}
	};

	$.blockUI({
		message: '<h2>Please wait</h2><img src="images/ajax-loader.gif" />',
		fadeIn: 200,
		fadeOut: 200
	});
	component.scope.Todo.findAll({}, function(todos) {
		todos.forEach(function(todo) {component.scope.todos.push(todo);});
		$.unblockUI();
	});
	can.Component.extend(component);
})(this);
