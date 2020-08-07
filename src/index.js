import React, { Component } from "react";
import ReactDOM from "react-dom";

import { createContext } from "./react";
const { Provider, Consumer } = createContext();
export default class Parent extends Component {
  state = {
    color: "red",
    number: 0,
  };

  render() {
    return (
      <div style={{ border: "5px solid red", padding: "10px" }}>
        <Provider value={{ message: "beautiful", number: this.state.number }}>
          <h1>我是父亲组件</h1>
          <p>{this.state.number}</p>
          <button
            onClick={() => {
              this.setState({ number: this.state.number + 1 });
            }}
          >
            +
          </button>
          <Son />
        </Provider>
      </div>
    );
  }
}

class Son extends Component {
  render() {
    return (
      <div style={{ border: "5px solid blue", padding: "10px" }}>
        <h1>我是儿子组件组件</h1>
        <GrandSon />
      </div>
    );
  }
}

class GrandSon extends Component {
  render() {
    return (
      <Consumer>
        {(context) => {
          return (
            <div style={{ border: "5px solid green", padding: "10px" }}>
              <h1>我是孙子组件</h1>
              <h2>{context.message}</h2>
              <h2>{context.number}</h2>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

ReactDOM.render(<Parent />, document.getElementById("root"));
