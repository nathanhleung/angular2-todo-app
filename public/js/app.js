var app = angular.module('todoApp', []); // Creates an angular app called 'todoApp' with no dependencies ([])
// Creates an angular controller called MainCtrl, which uses the $http service (for AJAX)
app.controller('MainCtrl', function($http) {
  // We use `this` because so we can use the controllers as instances
  // We'll set vm to the controller this value because the HTTP callback this value is different from the controller this value
  var vm = this;
  vm.formData = {};

  // Get all todos on page landing
  $http.get('/todos')
    .success(function(data) {
      vm.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // Notice the similarity in method names on the front and back-end.
  vm.postNewTodo = function() {
    $http.post('/todos', vm.formData)
      .success(function(data) {
        vm.formData = {}; // Clear the form
        vm.todos = data; // Remember, in our postNewTodo route handler we return all todos in JSON format
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  vm.deleteTodo = function(id) {
    $http.delete('/todos/' + id)
      .success(function(data) {
        vm.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

});
