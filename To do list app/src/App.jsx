 import "./styles.css";
import { useState } from "react";
import TodoItem from "./TodoItem";

export default function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  function handleAddTodo() {
    if (newTodoName === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { name: newTodoName, completed: false, id: crypto.randomUUID() },
    ]);
    setNewTodoName("");
    console.log(todos);
  }

  function handleDelete(currId) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== currId));
  }

  function handleToggle(Id, checked) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === Id) return { ...todo, completed: checked };
        return todo;
      })
    );
  }

  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          );
        })}
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </>
  );
}
