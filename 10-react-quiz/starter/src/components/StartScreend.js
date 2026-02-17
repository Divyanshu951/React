import React from "react";

function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz</h2>
      <h3>{numQuestion} questons to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quizActive" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
