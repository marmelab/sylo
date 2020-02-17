import React, { useState, useEffect, useRef, useCallback } from "react";
import useMutation from "@sylo/react/src/hooks/useMutation";
import classnames from "classnames";

import { useKeyPress } from "./useKeyPress";

export const TodoItem = ({ todo }) => {
  const escapePressed = useKeyPress("Escape");

  const [editName, setEditName] = useState(null);
  const { update: updateTodo, delete: deleteTodo } = useMutation("todos");

  useEffect(() => {
    escapePressed && editName && setEditName(null);
  }, [escapePressed]);

  const handleToggle = useCallback(
    () => updateTodo(todo.id, { completed: !todo.completed }),
    [todo.id, todo.completed]
  );

  const handleEditName = useCallback(() => setEditName(todo.name), [todo.name]);
  const handleEditNamePress = useCallback(
    e => {
      if (e.key === "Enter") {
        updateTodo(todo.id, { name: e.target.value });
        setEditName(null);
      }
    },
    [todo.id]
  );

  const handleDestroy = useCallback(() => deleteTodo(todo.id), [todo.id]);

  return (
    <li
      className={classnames({ completed: todo.completed, editing: !!editName })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onClick={handleToggle}
        />
        <label onDoubleClick={handleEditName}>{todo.name}</label>
        {typeof todo.id !== "undefined" && (
          <button className="destroy" onClick={handleDestroy} />
        )}
      </div>
      {editName !== null && (
        <input
          className="edit"
          value={editName}
          onChange={e => setEditName(e.target.value)}
          onKeyPress={handleEditNamePress}
        />
      )}
    </li>
  );
};
