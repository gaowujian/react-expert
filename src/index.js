import React from "./react";
import ReactDOM from "./react-dom";
import "./style.css";
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
    }, 0);
  };
  render() {
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter title="计数器" />, document.getElementById("root"));
