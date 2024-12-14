import { useState } from "react";
import "./styles.css";

export default function FilterForm({
  name,
  setName,
  hideCompleted,
  setHideCompleted,
}) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={hideCompleted}
          onClick={(e) => setHideCompleted(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  );
}
