import React, { Component } from "react";
import ReactDOM from "react-dom";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 10,
    };
  }

  add = () => {
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
      <button onClick={this.add}>
        {this.props.name}
        {this.state.number}
      </button>
    );
  }
}

ReactDOM.render(<Counter name="tony" />, document.getElementById("root"));
