import React, { Component } from "react";
import RouterContext from "./RouterContext";
// 负责创建一个全局的context
// 上下文中携带location和history对象
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    // 监听history的变化，如果变化就更改context值，并重新渲染。
    props.history.listen((location) => {
      this.setState({ location });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  // 取消监听
  unlisten = () => {};
  render() {
    const { location } = this.state;
    const { history } = this.props;
    const contextValue = {
      location,
      history,
    };
    return (
      <RouterContext.Provider value={contextValue}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
