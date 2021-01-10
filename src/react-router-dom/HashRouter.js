import React, { Component } from "react";

import { createHashHistory } from "../history";
import { Router } from "../react-router";

export default class HashRouter extends Component {
  constructor(props) {
    super(props);
    // 模拟自己的history对象,和window.history不同
    this.history = createHashHistory();
  }
  render() {
    return <Router history={this.history}>{this.props.children}</Router>;
  }
}
