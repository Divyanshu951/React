import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  // const [step, setStep] = useState(1);
  // const [isOpen, setIsOpen] = useState(true);

  // function handleNext() {
  //   if (step < 3) setStep((prevStep) => prevStep + 1);
  // }

  // function handlePrevious() {
  //   if (step > 1) setStep((prevStep) => prevStep - 1);
  // }

  // const buttonStyle = { background: "#7950F2", color: "#fff" };

  // Variables
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <>
      {/* <div>
        <button onClick={() => setStep((prevStep) => prevStep - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((prevStep) => prevStep + 1)}>+</button>
      </div> */}
      <input
        type="range"
        min="1"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <span>{step}</span>
      <div>
        <button onClick={() => setCount((prevCount) => prevCount - step)}>
          -
        </button>
        <span>
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </span>
        <button onClick={() => setCount((prevCount) => prevCount + step)}>
          +
        </button>
      </div>
      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      {count !== 0 ||
        (step !== 1 && (
          <button
            onClick={() => {
              setCount(0);
              setStep(1);
            }}
          >
            Reset
          </button>
        ))}
    </>
  );
}
