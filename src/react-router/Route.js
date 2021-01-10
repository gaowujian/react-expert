import React, { Component } from "react";
import RouterContext from "./RouterContext";
// 从router的上下文中拿到location和history
// 拿到pathname和path做match
export default class Route extends Component {
  static contextType = RouterContext;
  render() {
    const { location, history } = this.context;
    const { path, component: RouteComponent } = this.props;
    const match = location.pathname === path;
    const routeProps = { history, location, match };
    let renderElement = null;

    if (match) {
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}
