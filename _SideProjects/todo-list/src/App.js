import { useState } from "react";
import "./index.css";

// export default function App() {
//   const [todos, setTodos] = useState([
//     { id: 1, title: "Learn React Native", completed: false },
//     { id: 2, title: "Build Todo App", completed: true },
//   ]);

//   function handleToggleTodo(id) {
//     setTodos((todos) =>
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   }

//   function handleDeleteTodo(id) {
//     setTodos((todos) => todos.filter((todo) => todo.id !== id));
//   }

//   function handleAddTodo(title) {
//     if (!title.trim()) return;
//     setTodos((todos) => [
//       ...todos,
//       { id: Date.now(), title, completed: false },
//     ]);
//   }

//   return (
//     <div className="app">
//       <Header />
//       <div className="todo-container">
//         <AddTodoForm onAddTodo={handleAddTodo} />
//         <ToDoList
//           todoList={todos}
//           onToggle={handleToggleTodo}
//           onDeleteTodo={handleDeleteTodo}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// function Header() {
//   return <h1 className="header">Daily Todo’s</h1>;
// }

// function AddTodoForm({ onAddTodo }) {
//   const [title, setTitle] = useState("");

//   function handleFormInput(e) {
//     e.preventDefault();
//     if (!title.trim()) return;
//     onAddTodo(title);
//     setTitle("");
//   }

//   return (
//     <form onSubmit={handleFormInput} className="form">
//       <input
//         type="text"
//         placeholder="Add a task"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button className="btn btn-add">Add Task</button>
//     </form>
//   );
// }

// function ToDoList({ todoList, onToggle, onDeleteTodo }) {
//   return (
//     <div className="todo-list">
//       {todoList.map((item) => (
//         <ToDoItem
//           key={item.id}
//           item={item}
//           onToggle={onToggle}
//           onDeleteTodo={onDeleteTodo}
//         />
//       ))}
//     </div>
//   );
// }

// function ToDoItem({ item, onToggle, onDeleteTodo }) {
//   return (
//     <div className="todo-item">
//       <span className={`todo-title ${item.completed ? "completed" : ""}`}>
//         {item.title}
//       </span>

//       <div className="todo-buttons">
//         <button
//           onClick={() => onToggle(item.id)}
//           className={`btn ${item.completed ? "btn-undo" : "btn-done"}`}
//         >
//           {item.completed ? "Undone" : "Done"}
//         </button>
//         <button
//           onClick={() => onDeleteTodo(item.id)}
//           className="btn btn-remove"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

// function Footer() {
//   return <footer className="footer">Made with ❤️ in React</footer>;
// }

// Revision

const recepie = [
  {
    recepieName: "ddfsdfsdf",
    ingedrient: "kdhjfgkdhfg",
  },
  { recepieName: "dfsdfsd", ingedrient: "kdhjfgksdfsdfdhfg" },
];

export default function App() {
  return (
    <div>
      <Pizza Item={<Item />} />
    </div>
  );
}

/*
Rules: 

Creatng a Component:

1. Name must start with a UpperCase letter 
2. Must return JSX or null if you want the component to render nothing
*/

function Pizza({ Item }) {
  return (
    <div>
      <h2>Spinich</h2>
      <p>Ingredients: Tomato, Spiachm Cheese</p>
      <img
        src="https://content.jdmagicbox.com/v2/comp/hyderabad/l7/040pxx40.xx40.161118020616.b3l7/catalogue/pizza-company-hyderabad-pizza-outlets-2hwccxh.jpg"
        alt="Spinich pizza"
      />

      <h3>{Item}</h3>
    </div>
  );
}

function Item() {
  return (
    <div
      style={{ border: "1px solid green", padding: "5px", marginTop: "10px" }}
    >
      <span>✅ Bestseller</span>
    </div>
  );
}
