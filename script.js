var todoList = {
	todos: [],
	addTodo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function (position) {
		let todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		let totalTodos = this.todos.length;
		let completedTodos = 0;
		this.todos.forEach (function(todo){
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo){
			if (completedTodos === totalTodos) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});
		/*for (let i=0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++
      }
    }
    //If everything is true; make it false
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } //otherwise make everything false
     else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }*/
	}
};


var handlers = {
	addTodo: function () {
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		if (addTodoTextInput.value != false) {
			todoList.addTodo(addTodoTextInput.value);
		}
		addTodoTextInput.value = "";
		view.displayTodos();
	},

	changeTodo: function (position, value) {
		//var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		//var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		//todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		//changeTodoTextInput.value = '';
		//changeTodoPositionInput.value = '';
		todoList.changeTodo(position, value);
		view.displayTodos();
	},

	deleteTodo: function (position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},

	toggleCompleted: function (postion) {
		//var toggleCompletedTodoPositionInput = document.getElementById('toggleCompletedTodoPositionInput');
		//todoList.toggleCompleted(toggleCompletedTodoPositionInput.valueAsNumber);
		//toggleCompletedTodoPositionInput.value = '';
		todoList.toggleCompleted(postion);
		view.displayTodos();
	},

	toggleAll: function () {
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos: function () {
		var todosUL = document.querySelector(".todosUL");
		todosUL.innerHTML = "";
    
		todoList.todos.forEach(function(todo, position){ 
			var todoLi = document.createElement("li");
			var todoTextWithCompletion = "";
			if (todo.completed === true) {
				todoTextWithCompletion = "(X) " + todo.todoText;
			} else {
				todoTextWithCompletion = "( ) " + todo.todoText;
			}
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todoLi.appendChild(this.createChangeButton());
			todoLi.appendChild(this.createCompleteButton());
			todosUL.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function () {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	createChangeButton: function() {
		var changeButton = document.createElement("button");
		changeButton.textContent = "Change";
		changeButton.className = "changeButton";
		return changeButton;
	},
	createCompleteButton: function() {
		var completeButton = document.createElement("button");
		completeButton.textContent = "Complete";
		completeButton.className = "completeButton";
		return completeButton;
	},
	setUpEventListener: function () {
		var todosUL = document.querySelector(".todosUL");
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		todosUL.addEventListener("click", function (event) {
			var elementClicked = event.target;
			var position = elementClicked.parentNode.id;
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo(parseInt(position));
			}
		});
		todosUL.addEventListener("click", function (event) {
			var elementClicked = event.target;
			var position = elementClicked.parentNode.id;
			if (elementClicked.className === "completeButton") {
				handlers.toggleCompleted(parseInt(position));
			}
		});
		todosUL.addEventListener("click", function (event) {
			var elementClicked = event.target;
			var position = event.target.parentNode.id;
			var changeButton = document.querySelector(".changeButton");
			if (elementClicked.className === "changeButton") {
				var changeTodoText = document.createElement("INPUT");
				changeTodoText.setAttribute("type", "text");
				changeTodoText.className = "changeTodoText";
				if (!document.querySelector(".changeTodoText")){
					elementClicked.parentNode.appendChild(changeTodoText);
					//elementClicked.disabled = true;
					changeTodoText.addEventListener("keyup", function (event) {
						if (event.keyCode === 13) {
							var changeTodoTextValue = changeTodoText.value;
							if (changeTodoTextValue != false) {
								handlers.changeTodo(position, changeTodoTextValue);
							}
						}
					});
				}
			}
		});
		addTodoTextInput.addEventListener("keyup", function(event){
			if (event.keyCode === 13) {
				handlers.addTodo();
			}
		});
	}
};

view.setUpEventListener();

