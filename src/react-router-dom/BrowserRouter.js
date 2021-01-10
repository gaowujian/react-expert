import React, { Component } from "react";

import { createBrowserHistory } from "../history";
import { Router } from "../react-router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    // 模拟自己的history对象
    this.history = createBrowserHistory();
  }
  render() {
    return <Router history={this.history}>{this.props.children}</Router>;
  }
}
