const listElement = document.querySelector("#app ul");
const inputElement = document.querySelector("#app input");
const buttonElement = document.querySelector("#app button");
const text = document.querySelector("#marcked");

var todos = JSON.parse(localStorage.getItem("list_todos")) || [];

function renderTodos() {
  listElement.innerHTML = "";

  for (todo of todos) {
    var todoCheck = document.createElement("input");
    todoCheck.type = "checkbox";
    todoCheck.id = "check";
    var todoElement = document.createElement("li");
    var todoText = document.createTextNode(todo);

    var linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    var editElement = document.createElement("a");
    editElement.setAttribute("href", "#");

    var pos = todos.indexOf(todo);
    linkElement.setAttribute("onclick", "deleteTodo(" + pos + ")");
    editElement.setAttribute("onclick", "editTodo(" + pos + ")");
    var linkText = document.createTextNode("Excluir");
    var editText = document.createTextNode("Editar");
    todoElement.appendChild(todoCheck);
    linkElement.appendChild(linkText);
    editElement.appendChild(editText);
    todoElement.appendChild(todoText);
    todoElement.appendChild(editElement);
    todoElement.appendChild(linkElement);
    listElement.appendChild(todoElement);
  }

  var checks1 = document.querySelectorAll("li #check");
  var checks = Array.prototype.slice.call(checks1);
  checks.map((check) => {
    check.addEventListener("click", (e) => {
      var indexchecks = checks.indexOf(check);
      if (check.checked == true) {
        deleteTodo(indexchecks);
        marcked.style.display = "block";
        setTimeout(() => {
          marcked.style.display = "none";
        }, 2000);
      }
    });
  });
}

renderTodos();
console.log(listElement);

function addTodo() {
  var todoText = inputElement.value;
  todos.push(todoText);
  inputElement.value = "";
  renderTodos();
  saveToStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}

function editTodo(pos) {
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var cancelEdit = document.createElement("button");
  var editButtonText = document.createTextNode("Editar");
  var cancelEditText = document.createTextNode("Cancelar");
  cancelEdit.appendChild(cancelEditText);
  editButton.appendChild(editButtonText);
  var edit = listElement.children;
  edit[pos].appendChild(editInput);
  edit[pos].appendChild(editButton);
  edit[pos].appendChild(cancelEdit);
  cancelEdit.addEventListener("click", () => {
    edit[pos].removeChild(editInput);
    edit[pos].removeChild(editButton);
    edit[pos].removeChild(cancelEdit);
  });
  editButton.addEventListener("click", () => {
    var editText = editInput.value;
    todos.splice(pos, 1, editText);
    editInput.value = "";
    renderTodos();
    saveToStorage();
  });
}

function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}
