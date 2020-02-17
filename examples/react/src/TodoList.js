import React, { useState, useCallback } from "react";
import { TodoItem } from "./TodoItem";
import useList from "@sylo/react/src/hooks/useList";
import { Link } from "@reach/router";
import useMutation from "@sylo/react/src/hooks/useMutation";

const isSelected = ({ isCurrent }) => {
  return isCurrent ? { className: "selected" } : null;
};

const ExactNavLink = props => <Link getProps={isSelected} {...props} />;

const TodoListPlaceholder = ({ count }) => (
  <ul className="todo-list">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <TodoItem
          key={`p-${i}`}
          todo={{ name: "░░".repeat(4 + Math.random() * 8) }}
        />
      ))}
  </ul>
);

const TodoListFooter = ({ completedCount, totalCount, onClearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{totalCount - completedCount}</strong> left
    </span>
    <ul className="filters">
      <li>
        <ExactNavLink to="/">All</ExactNavLink>
      </li>
      <li>
        <ExactNavLink to="/active">Active</ExactNavLink>
      </li>
      <li>
        <ExactNavLink to="/completed">Completed</ExactNavLink>
      </li>
    </ul>
    {completedCount > 0 && (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    )}
  </footer>
);

export const TodoList = ({ filter }) => {
  const [selectAll, setSelectAll] = useState(false);
  const { update: updateTodo, delete: deleteTodo } = useMutation("todos");

  const { data: todos, loading } = useList(
    "todos",
    filter === "active"
      ? { filter: { completed: false } }
      : filter === "completed"
      ? { filter: { completed: true } }
      : undefined
  );

  const handleToggleAll = useCallback(() => {
    (todos || []).forEach(({ id }) => {
      updateTodo(id, { completed: !selectAll });
    });

    setSelectAll(!selectAll);
  }, [todos]);

  const handleClearCompleted = useCallback(() => {
    (todos || [])
      .filter(todo => todo.completed)
      .forEach(({ id }) => {
        deleteTodo(id);
      });

    setSelectAll(false);
  }, [todos]);

  if (loading) {
    return (
      <>
        <TodoListPlaceholder count={4} />
        <TodoListFooter />
      </>
    );
  }

  return (
    todos && (
      <>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={handleToggleAll}
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        <TodoListFooter
          totalCount={todos.length}
          completedCount={todos.filter(d => d.completed).length}
          onClearCompleted={handleClearCompleted}
        />
      </>
    )
  );
};
