import React, { useEffect, useState } from "react";

const questionList = [
  {
    id: 1,
    question: "console.log(typeof NaN);",
    options: [
      { id: "a", text: "number" },
      { id: "b", text: "null" },
      { id: "c", text: "NaN" },
      { id: "d", text: "undefined" },
    ],
    answerId: "b",
  },
  {
    id: 2,
    question: "console.log(018 - 015);",
    options: [
      { id: "a", text: "NaN" },
      { id: "b", text: "3" },
      { id: "c", text: "5" },
      { id: "d", text: "13" },
    ],
    answerId: "c",
  },
  {
    id: 3,
    question: "console.log(String.raw`HelloTwitter\nworld`);",
    options: [
      { id: "a", text: "HelloTwitter\nworld" },
      { id: "b", text: "HelloTwitter\nworld" },
      { id: "c", text: "HelloTwitter world" },
      { id: "d", text: "Hello Twitter world" },
    ],
    answerId: "a",
  },
  {
    id: 4,
    question: "console.log(3 > 2 > 1);",
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
    ],
    answerId: "b",
  },
  {
    id: 5,
    question: "console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
    options: [
      { id: "a", text: "bananaa" },
      { id: "b", text: "baa" },
      { id: "c", text: "banana" },
      { id: "d", text: "ananas" },
    ],
    answerId: "c",
  },
  {
    id: 6,
    question: 'console.log("This is a string." instanceof String);',
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
    ],
    answerId: "b",
  },
  {
    id: 7,
    question: "console.log(0.1 + 0.2 == 0.3);",
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
    ],
    answerId: "b",
  },
  {
    id: 8,
    question: 'console.log(1 +  "2" + "2");',
    options: [
      { id: "a", text: "122" },
      { id: "b", text: "32" },
      { id: "c", text: "NaN2" },
      { id: "d", text: "NaN" },
    ],
    answerId: "a",
  },
  {
    id: 9,
    question: "console.log(false == '0');",
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
    ],
    answerId: "a",
  },
  {
    id: 10,
    question: `let array = [1, 2, 3];
    array[6] = 9;
    console.log(array[5]);`,
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "9" },
      { id: "d", text: "undefined" },
    ],
    answerId: "d",
  },
];

function App() {
  const [questionNo, setQuestionNo] = useState(0);

  function handleNext() {
    if (questionNo > 8) return;
    setQuestionNo((questionNo) => questionNo + 1);
  }

  function handlePrevious() {
    if (questionNo < 1) return;
    setQuestionNo((questionNo) => questionNo - 1);
  }

  function handleSelection(e) {
    if (questionList[questionNo].answerId === e.target.dataset.optionId) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("wrong");
    }
  }

  return (
    <header>
      <h1>JavaScript Quiz</h1>
      <Timer />

      {/* Question section */}
      <main className="question">
        <div className="question__nav">
          <div className="question__progress">
            <div
              className="question__arrow question__arrow--left"
              onClick={handlePrevious}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="icon">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p>
              <span>{questionNo + 1}</span>/10
            </p>
            <div
              className="question__arrow question__arrow--right"
              onClick={handleNext}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="icon">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>

        <h2 className="question__text">Question: Can you guess the result?</h2>
        <p className="question__code">{questionList[questionNo].question}</p>
        {questionList[questionNo].options.map((option) => (
          <p
            className="option"
            data-option-id={option.id}
            onClick={handleSelection}
          >
            {option.text}
          </p>
        ))}
      </main>
    </header>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `00:${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  }

  return (
    <p className="timer">
      Timer: <em>{formatTime(seconds)}</em>
    </p>
  );
}

export default App;
