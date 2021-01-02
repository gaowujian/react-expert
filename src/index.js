import React from "./react";
import ReactDOM from "./react-dom";
import "./style.css";
class Counter extends React.Component {
  static defaultProps = {
    name: "计数器",
  };
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter title="计数器" />, document.getElementById("root"));
