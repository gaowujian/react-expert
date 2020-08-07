import React from "react";
import ReactDOM from "react-dom";
import bg from "./bg.jpeg";

class MouseTracker extends React.Component {
  state = {
    x: 0,
    y: 0,
  };
  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render({ x: this.state.x, y: this.state.y })}
      </div>
    );
  }
}

function Picture({ x, y }) {
  return (
    <div style={{ height: "300px", width: "400px", border: "1px solid red" }}>
      <img
        src={bg}
        alt="bird"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <p>
        鼠标的位置:{x} {y}
      </p>
    </div>
  );
}

ReactDOM.render(
  <MouseTracker render={(props) => <Picture {...props} />} />,
  document.getElementById("root")
);
