import React from "react";
import ReactDOM from "react-dom";
import bg from "./bg.jpeg";

function withMouseTracker(WrappedComponent) {
  return class extends React.Component {
    state = {
      x: 0,
      y: 0,
    };
    handleMouseMove = (e) => {
      this.setState({ x: e.clientX, y: e.clientY });
    };
    render() {
      return (
        <div
          style={{ height: "300px", width: "400px", border: "1px solid red" }}
          onMouseMove={this.handleMouseMove}
        >
          <WrappedComponent />
          <p>
            鼠标的位置:{this.state.x} {this.state.y}
          </p>
        </div>
      );
    }
  };
}

function Picture() {
  return (
    <img
      src={bg}
      alt="bird"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

const WrappedPicture = withMouseTracker(Picture);

ReactDOM.render(<WrappedPicture />, document.getElementById("root"));
