import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
  }

  add = () => {
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    console.log(this);
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
