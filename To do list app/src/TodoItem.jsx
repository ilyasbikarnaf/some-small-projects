export default function TodoItem({ todo, handleDelete,handleToggle }) {
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          checked={todo.completed}
          type="checkbox"
          onChange={(e) => handleToggle(todo.id, e.target.checked)}
          data-list-item-checkbox
        />
        <span data-list-item-text>{todo.name}</span>
      </label>
      <button data-button-delete onClick={() => handleDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}
