import { useEffect } from "react";

function EachQuestionTimer({ eachQuestionSecondsRemaining, dispatch }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        console.log("Y");
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch],
  );

  return (
    <div
      style={{ border: "none", fontSize: "22px" }}
      className={
        eachQuestionSecondsRemaining <= 5 ? "timer sec-timer" : "timer"
      }
    >
      {eachQuestionSecondsRemaining}
    </div>
  );
}

export default EachQuestionTimer;
