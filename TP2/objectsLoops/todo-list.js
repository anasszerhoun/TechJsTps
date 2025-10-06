const todoList = [];

renderTodoList();

function renderTodoList() {

  let todoListHTML = "";

  todoList.forEach((t, index) => {
    todoListHTML += `<div>${t.name}</div> <div> ${t.dueDate}</div>  <button class="delete-todo-button">delete</button>`;
  });

  const toDOLIST = document.querySelector(".js-todo-list");
  toDOLIST.innerHTML = todoListHTML;

  
  const deleteButtons = document.querySelectorAll(".delete-todo-button");

  deleteButtons.forEach((button,index) => {
    button.addEventListener("click", () => {
      todoList.splice(index, index + 1);
      renderTodoList();
    });
  });

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  todoList.push({ name: name, dueDate: dueDate });

  // Add these values to the variable "todoList"

  inputElement.value = "";

  renderTodoList();
}

