import { useState } from "react";

export default function App() {
  return (
    <div>
      <Input />
    </div>
  );
}

function Input() {
  const [input, setInput] = useState("");

  return (
    <form>
      <input
        placeholder="Add a task ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="submit">+</button>
    </form>
  );
}
