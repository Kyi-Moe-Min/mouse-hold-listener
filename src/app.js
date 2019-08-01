import React from "react";
import MHL from "./MouseHoldListener";

export default class extends React.Component {
  showDiv = () => {
    let e = document.getElementById("e2");
    e.classList.remove("hide");
  };

  hideDiv = () => {
    console.log("hide div");
    let e = document.getElementById("e2");
    e.classList.add("hide");
  };

  render() {
    return (
      <div>
        <MHL
          onHoldStart={this.showDiv}
          onHoldEnd={this.hideDiv}
          className="border"
        >
          hold me
        </MHL>
        <div id="e2" className="border hide">
          hello
        </div>
      </div>
    );
  }
}
