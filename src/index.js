import React from "./react";
import ReactDOM from "./react-dom";
import "./style.css";

class Counter extends React.Component {
  state = {
    number: 0,
  };
  handleOuterClick = () => {
    console.log("outer");
    this.setState({ number: this.state.number + 5 });
  };
  handleInnerClick = () => {
    console.log("inner");
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div id={this.state.number + "counter"}>
        <h1>count:{this.state.number}</h1>
        <section onClick={this.handleOuterClick}>
          <button onClick={this.handleInnerClick}>++</button>
        </section>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
