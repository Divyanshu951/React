// ✅ 10/10 React Todo App
// -------------------------------------
// Goals of this version:
// - Keep your logic identical
// - Add inline edit/save distinction for clarity
// - Add localStorage persistence
// - Sync editedTitle correctly with parent
// - Clean unused props
// - Add clear code comments and structure
// -------------------------------------

import { useState, useEffect } from "react";

export default function App() {
  // ✅ Keep initial todos, but now load from localStorage
  // OLD:
  // const [todos, setTodos] = useState([
  //   { id: 1, title: "Learn React", completed: false, isEditable: false },
  //   { id: 2, title: "Build Todo App", completed: true, isEditable: false },
  // ]);
  // NEW:
  // Added lazy initializer function to load todos from localStorage.
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Learn React", completed: false, isEditable: false },
          {
            id: 2,
            title: "Build Todo App",
            completed: true,
            isEditable: false,
          },
        ];
  });

  // ✅ Persist todos to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Function to toggle completion
  function handleToggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // ✅ Function to toggle edit mode or save edited title
  // OLD:
  // function handleToggleEditMode(id, editedTitle) {
  //   if (!editedTitle.trim()) return;
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id
  //         ? { ...todo, isEditable: !todo.isEditable, title: editedTitle }
  //         : todo
  //     )
  //   );
  // }
  //
  // NEW:
  // Split logic so "Edit" and "Save" are distinct actions.
  // This prevents issues when trying to close edit mode with empty input.
  function handleToggleEditMode(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditable: !todo.isEditable } : todo
      )
    );
  }

  function handleSaveEdit(id, newTitle) {
    if (!newTitle.trim()) return; // prevent blank titles
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, isEditable: false } : todo
      )
    );
  }

  // ✅ Delete todo
  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // ✅ Add todo
  function handleAddTodo(title) {
    setTodos([
      ...todos,
      { id: Date.now(), title, completed: false, isEditable: false },
    ]);
  }

  // ✅ Clear all completed todos (new small feature)
  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  return (
    <div>
      <Header />
      <hr />

      {/* OLD: <AddTodoForm todos={todos} onAddTodo={handleAddTodo} /> */}
      {/* NEW: Removed unused prop `todos` */}
      <AddTodoForm onAddTodo={handleAddTodo} />
      <hr />

      <ToDoList
        todoList={todos}
        onToggle={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onEditToggle={handleToggleEditMode}
        onSaveEdit={handleSaveEdit}
      />

      <hr />
      <Footer onClearCompleted={handleClearCompleted} />
    </div>
  );
}

// ✅ AddTodoForm: Clean and minimal
function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  function handleFormInput(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleFormInput}>
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

// ✅ Header component unchanged
function Header() {
  return <h1>ToDo List</h1>;
}

// ✅ ToDoList: only prop renaming for clarity
function ToDoList({
  todoList,
  onToggle,
  onDeleteTodo,
  onEditToggle,
  onSaveEdit,
}) {
  return (
    <div>
      {todoList.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDeleteTodo={onDeleteTodo}
          onEditToggle={onEditToggle}
          onSaveEdit={onSaveEdit}
        />
      ))}
    </div>
  );
}

// ✅ ToDoItem: biggest upgrade
function ToDoItem({ item, onToggle, onDeleteTodo, onEditToggle, onSaveEdit }) {
  const [editedTitle, setEditedTitle] = useState(item.title);

  // ✅ NEW:
  // Sync local editedTitle when parent updates
  // (fixes out-of-sync bug when title is changed externally)
  useEffect(() => {
    setEditedTitle(item.title);
  }, [item.title]);

  return (
    <div className="flex">
      <div>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />

        {item.isEditable ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={item.completed ? "completed marginL" : "marginL"}
          />
        ) : (
          <span className={item.completed ? "completed" : ""}>
            {item.title}
          </span>
        )}
      </div>

      <div>
        {/* OLD: one button did both Edit + Save */}
        {/* NEW: separate for clarity and control */}
        {item.isEditable ? (
          <button
            className="marginL"
            onClick={() => onSaveEdit(item.id, editedTitle)}
          >
            ✅
          </button>
        ) : (
          <button className="marginL" onClick={() => onEditToggle(item.id)}>
            📝
          </button>
        )}

        <button onClick={() => onDeleteTodo(item.id)}>❌</button>
      </div>
    </div>
  );
}

// ✅ Footer with Clear Completed button (small logical addition)
function Footer({ onClearCompleted }) {
  return (
    <footer>
      <button onClick={onClearCompleted}>Clear Completed</button>
    </footer>
  );
}
