// import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 2, packed: false },
// ];

const pizzas = ["ljdhfgklhgkjh", "Margherita", "Pepperoni", "Veggie"];

export default function App() {
  return (
    <ul className="app">
      {pizzas.map((item) => (
        <Start text={item} key={item} />
      ))}
    </ul>
  );
}

function Start({ text }) {
  return (
    <li
      style={{
        color: "red",
        fontSize: "40px",
        textTransform: "uppercase",
        borderBottom: "2px solid green",
      }}
    >
      {text}
    </li>
  );
}
