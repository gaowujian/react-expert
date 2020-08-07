import React, { Component } from "react";

export function createContext() {
  let value;
  const Provider = class extends Component {
    constructor(props) {
      super(props);
      value = props.value;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      //更新值很重要
      value = nextProps.value;
      //Provider组件有没有自己的state值并不重要,也可以直接返回{}
      return {};
    }
    render() {
      return <div>{this.props.children}</div>;
    }
  };

  const Consumer = class extends Component {
    render() {
      const context = value;
      return <div>{this.props.children(context)}</div>;
    }
  };
  return { Provider, Consumer };
}
