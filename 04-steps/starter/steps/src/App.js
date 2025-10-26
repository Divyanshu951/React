import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [active, setActive] = useState(0);

  const buttonStyle = { background: "#7950F2", color: "#fff" };

  function next() {
    if (active < 2) setActive(active + 1);
  }

  function previous() {
    if (active > 0) setActive(active - 1);
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={active >= 0 ? "active" : ""}>1</div>
        <div className={active >= 1 ? "active" : ""}>2</div>
        <div className={active >= 2 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        {active}
        {messages[active]}
      </p>

      <div className="buttons">
        <button onClick={previous} style={buttonStyle}>
          Previous
        </button>
        <button onClick={next} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}
