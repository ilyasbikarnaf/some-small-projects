interface Todo {
  text: string;
  checked: boolean;
}

const btn = document.getElementById("btn");
const input = document.getElementById("todoInput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.querySelector(".todos")!;

const todos: Todo[] = readTodos();
todos.forEach(createTodoElement);

function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON === null) return [];
  return JSON.parse(todoJSON);
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  const newTodo: Todo = {
    text: input.value,
    checked: false,
  };
  todos.push(newTodo);
  createTodoElement(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";
}

function createTodoElement(todo: Todo) {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.checked;

  checkbox.addEventListener("change", function () {
    console.log(checkbox.checked);
    todo.checked = checkbox.checked;

    localStorage.setItem("todos", JSON.stringify(todos));
  });

  newLI.append(todo.text, checkbox);
  list.append(newLI);
}

form.addEventListener("submit", handleSubmit);
