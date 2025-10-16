import { useState } from "react";

const data = [
  { id: 1, description: "DSA", status: false },
  { id: 2, description: "React", status: true },
];

export default function App() {
  return (
    <div>
      <Form />
      <ItemList />
    </div>
  );
}

function Form() {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    setDescription("");

    // const newitem =
  }

  return (
    <form>
      <input
        placeholder="Add a task ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit} className="submit">
        +
      </button>
    </form>
  );
}

function Item() {
  const prop = { id: 1, description: "DSA", status: false };

  return;
}

function ItemList() {
  return <ul>{/* <li>{data.map(item => )}</li> */}</ul>;
}
