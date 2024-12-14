import { useState } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";
import { useEffect } from "react";
import { useReducer } from "react";
import NewTodoForm from "./NewTodoForm";
import { createContext } from "react";
import TodoList from "./TodoList";
import FilterForm from "./FilterForm";

const LOCAL_STORAGE_KEY = "TODOS";
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  EDIT: "EDIT",
};

function reducer(todos, { type, payload = {} }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];

    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.todoId)
          return { ...todo, completed: payload.completed };

        return todo;
      });

    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.todoId);

    case ACTIONS.EDIT:
      return todos.map((todo) => {
        if (todo.id === payload.todoId) return { ...todo, name: payload.name };
        return todo;
      });

    default:
      throw new Error(`No action found for ${type}`);
  }
}

export const TodoContext = createContext();

function App() {
  const [filterName, setFilterName] = useState("");
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false);
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const localTodoList = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localTodoList == null) return initialValue;
    return JSON.parse(localTodoList);
  });

  console.log(hideCompletedFilter, filterName);

  const filteredTodos = todos.filter((todo) => {
    if (hideCompletedFilter && todo.completed) return false;

    return todo.name.includes(filterName);
  });

  // const [todo, dispatch] = useReducer(reducer, state);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { todoId } });
  }

  function editTodo(todoId, editedName) {
    dispatch({ type: ACTIONS.EDIT, payload: { todoId, name: editedName } });
  }

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addNewTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
      }}
    >
      <FilterForm
        name={filterName}
        setName={setFilterName}
        hideCompletedr={hideCompletedFilter}
        setHideCompleted={setHideCompletedFilter}
      />
      <TodoList />

      <NewTodoForm />
    </TodoContext.Provider>
  );
}

export default App;
