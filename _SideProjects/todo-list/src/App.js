import { useState } from "react";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React Native", completed: false },
    { id: 2, title: "Build Todo App", completed: true },
  ]);

  function handleToggleTodo(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleAddTodo(title) {
    if (!title.trim()) return;
    setTodos((todos) => [
      ...todos,
      { id: Date.now(), title, completed: false },
    ]);
  }

  return (
    <div className="app">
      <Header />
      <div className="todo-container">
        <AddTodoForm onAddTodo={handleAddTodo} />
        <ToDoList
          todoList={todos}
          onToggle={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return <h1 className="header">Daily Todo’s</h1>;
}

function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  function handleFormInput(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleFormInput} className="form">
      <input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-add">Add Task</button>
    </form>
  );
}

function ToDoList({ todoList, onToggle, onDeleteTodo }) {
  return (
    <div className="todo-list">
      {todoList.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

function ToDoItem({ item, onToggle, onDeleteTodo }) {
  return (
    <div className="todo-item">
      <span className={`todo-title ${item.completed ? "completed" : ""}`}>
        {item.title}
      </span>

      <div className="todo-buttons">
        <button
          onClick={() => onToggle(item.id)}
          className={`btn ${item.completed ? "btn-undo" : "btn-done"}`}
        >
          {item.completed ? "Undone" : "Done"}
        </button>
        <button
          onClick={() => onDeleteTodo(item.id)}
          className="btn btn-remove"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return <footer className="footer">Made with ❤️ in React</footer>;
}
