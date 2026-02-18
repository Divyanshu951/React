import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreend";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
// import EachQuestionTimer from "./EachQuestionTimer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0,

  // Loading, Error, ready, active, finished
  status: "loading",
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  // eachQuestionSecondsRemaining: SEC_PER_QUESTION,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          question.correctOption === action.payLoad
            ? state.points + question.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        status: "finished",
        eachQuestionSecondsRemaining: SEC_PER_QUESTION,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        eachQuestionSecondsRemaining: SEC_PER_QUESTION,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        points: 0,
        index: 0,
        answer: null,
      };
    case "tick":
      const newSeconds = state.secondsRemaining - 1;

      return {
        ...state,
        secondsRemaining: newSeconds,
        status: newSeconds === 0 ? "finished" : state.status,
      };
    // case "secondsTick":
    //   return {
    //     ...state,
    //     eachQuestionSecondsRemaining:
    //       state.eachQuestionSecondsRemaining === 0
    //         ? SEC_PER_QUESTION
    //         : state.eachQuestionSecondsRemaining - 1,
    //     index:
    //       state.eachQuestionSecondsRemaining === 0
    //         ? state.index + 1
    //         : state.index,
    //     status:
    //       state.index === state.questions.length - 1
    //         ? "finished"
    //         : state.status,
    //   };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  // State: Updated_state, dispatch (takes a obj which is passed as action in reducer): fn_to_update_state, reducer: reducer_fn(state = {receves the latest state obj}, action = {type, payload})
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    // eachQuestionSecondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (total, question) => total + question.points,
    0,
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:3001/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payLoad: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              {/* <EachQuestionTimer
                questions={questions}
                index={index}
                eachQuestionSecondsRemaining={eachQuestionSecondsRemaining}
                dispatch={dispatch}
              /> */}
              <NextButton
                dispatch={dispatch}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
