import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handleNext() {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  }

  function handlePrevious() {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  }

  const buttonStyle = { background: "#7950F2", color: "#fff" };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        {isOpen ? "\u00D7" : "\u2600"}
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step} : {messages[step - 1]}
          </p>

          <div className="buttons">
            <button onClick={handlePrevious} style={buttonStyle}>
              Previous
            </button>
            <button onClick={handleNext} style={buttonStyle}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
