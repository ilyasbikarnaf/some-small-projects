import { useContext } from "react";
import { TodoContext } from "./App";
import { useRef, useState } from "react";

export function TodoItem({ id, name, completed }) {
  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const editedNameRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    if (editedNameRef.current.value == "") return;

    editTodo(id, editedNameRef.current.value);
    setIsEditing(false);
  }

  return (
    <li className="list-item">
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={editedNameRef} />
            <button>Save</button>
          </form>
        </>
      ) : (
        <>
          <label className="list-item-label">
            <input
              checked={completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <span data-list-item-text>{name}</span>
            <button data-button-edit onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button onClick={() => deleteTodo(id)} data-button-delete>
              Delete
            </button>
          </label>
        </>
      )}
    </li>
  );
}
