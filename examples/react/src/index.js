import React, { useState } from "react";
import { render } from "react-dom";
import SyloProvider from "@sylo/react/src/SyloProvider";
import useMutation from "@sylo/react/src/hooks/useMutation";
import "todomvc-app-css/index.css";
import { Router } from "@reach/router";

import "./fakeServer";
import dataResolver from "./dataResolver";
import { TodoList } from "./TodoList";

const App = ({ filter }) => {
  const [newTodo, setNewTodo] = useState("");
  const mutation = useMutation("todos");

  const handleNewTodo = () => {
    if (!newTodo) {
      return;
    }

    mutation.create({
      completed: false,
      name: newTodo
    });

    setNewTodo("");
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleNewTodo()}
        />
      </header>
      <section className="main">
        <TodoList filter={filter} />
      </section>
    </section>
  );
};

render(
  <SyloProvider dataResolver={dataResolver}>
    <Router>
      <App path=":filter" />
      <App default />
    </Router>
  </SyloProvider>,
  document.getElementById("root")
);
