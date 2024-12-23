import React, { useState, useEffect } from "react";

const TodoList = () => {
  const url_api = "https://playground.4geeks.com/todo/users/jaimito";

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url_api);
      if (response.ok) {
        const data = await response.json();
        console.log("datos de la API:", data); // imprime datos de la API
        setTodos(data.todos || []);
      } else {
        console.log("error: ", response.status, response.statusText);
      }
    };

    getData();
  }, []);

  const handleClick = () => {
    if (newTodo.trim() !== "") {
      const newTask = { label: newTodo, is_done: false, id: Date.now() };
      setTodos([...todos, newTask]);
      console.log("Tarea agregada:", newTask);
      setNewTodo("");
    }
  };

  const deleteTask = (indice) => {
    const newList = todos.filter((todo, i) => i !== indice);
    setTodos(newList);
  };

  const completeTask = (indice) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === indice) {
        console.log(
          todo.is_done ? "Tarea marcada como incompleta:" : "Tarea completada:",
          todo
        );
        return { ...todo, is_done: !todo.is_done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className="content">
      <h1 className="title">Todo List</h1>
      <div className="container">
        <div className="addNew">
          <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={handleChange}
            placeholder="Escribiendo..."
          />
          <button onClick={handleClick} className="btn btn-success">
            Agregar
          </button>
        </div>
        <ul className="list-group">
          {todos.map((todo, indice) => {
            return (
              <li
                key={indice}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  indice % 2 === 0 ? "bg-light" : ""
                }`}
              >
                <span>{todo.label}</span>
                <div className="button-container">
                  <button
                    onClick={() => completeTask(indice)}
                    className={`btn ${
                      todo.is_done ? "btn-secondary" : "btn-warning"
                    }`}
                  >
                    {todo.is_done ? "Incompleto" : "Completado"}
                  </button>
                  <button
                    onClick={() => deleteTask(indice)}
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;