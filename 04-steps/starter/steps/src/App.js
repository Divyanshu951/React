import { useState } from "react";

export default function App() {
  console.log("🔁 App component executed!");

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // updating state
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}
