import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);

  console.log(step);

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  function handlePrevious() {
    if (step > 1) setStep(step - 1);
  }

  const buttonStyle = { background: "#7950F2", color: "#fff" };

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">{messages[step - 1]}</p>

      <div className="buttons">
        <button onClick={handlePrevious} style={buttonStyle}>
          Previous
        </button>
        <button onClick={handleNext} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}
