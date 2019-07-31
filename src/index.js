import React from "react";
import ReactDOM from "react-dom";
import Apps from "./app";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Apps />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
