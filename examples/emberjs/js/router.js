/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('todos', { path: '/' }, function () {
			this.route('active');
			this.route('completed');
		});
	});

	Todos.TodosRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('todo');
		},
		actions: {
			loading: function() {
				$.blockUI({
					message: '<h2>Please wait</h2><img src="images/ajax-loader.gif" />',
					fadeIn: 200,
					fadeOut: 200
				});
			},
			error: function() {
				console.log('error');
			}
		}
  });

	Todos.TodosIndexRoute = Todos.TodosRoute.extend({
		templateName: 'todo-list',
		controllerName: 'todos-list',
		afterModel: function() {
			$.unblockUI();
			return false;
		},
		actions: {
			loading: function() {
				return false;
			}
		}
});

	Todos.TodosActiveRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return !todo.get('isCompleted');
			});
		}
	});

	Todos.TodosCompletedRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted');
			});
		}
	});
})();
