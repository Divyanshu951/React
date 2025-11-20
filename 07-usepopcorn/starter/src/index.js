import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StartRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StartRating
      maxRating={5}
      size="20px"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StartRating
      maxRating={7}
      size="40px"
      color="orangeRed"
      className="test"
      defaultRating={4}
    />
  </React.StrictMode>
);
