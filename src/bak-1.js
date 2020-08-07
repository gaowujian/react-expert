import React from "react";
import ReactDOM from "react-dom";

export default class MouseTracker extends React.Component {
  state = {
    x: 0,
    y: 0,
  };
  handleMouseMove = (e) => {
    console.dir(e.target);
    this.setState({ x: e.clientX, y: e.clientY });
  };
  render() {
    return (
      <div
        style={{ height: "500px", width: "1000px", border: "1px solid red" }}
        onMouseMove={this.handleMouseMove}
      >
        <p>
          鼠标的位置:{this.state.x} {this.state.y}
        </p>
      </div>
    );
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById("root"));
