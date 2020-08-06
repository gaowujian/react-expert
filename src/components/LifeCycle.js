import React, { Component } from "react";

export default class LifeCycle extends Component {
  // 默认的参数，
  static defaultProps = {
    name: "默认app名字",
  };
  constructor(props) {
    super(props);
    // 初始化默认的状态对象
    this.state = {
      number: 0,
    };
    console.log("1. constructor 初始化阶段 initialization 建立props和state");
  }
  add = () => {
    this.setState({ number: this.state.number + 1 });
  };
  componentWillMount() {
    console.log("2. componentWillMount 组件将要挂载");
  }
  //   挂载就是 虚拟dom或者react元素，转化成真实dom的过程
  render() {
    console.log("3. render 渲染，也就是挂载");
    return (
      <div style={{ border: "5px solid red", padding: "10px" }}>
        <h1>app name: {this.props.name}</h1>
        <p>number:{this.state.number}</p>
        <button onClick={this.add}>+</button>
        {this.state.number % 2 === 0 && (
          <SubCounter number={this.state.number} />
        )}
      </div>
    );
  }
  componentDidMount() {
    console.log("4. componentDidMount 组件挂载完成");
  }
  shouldComponentUpdate() {
    console.log("5. shouldComponentUpdate 询问组件是否需要更新");
    return true;
  }
  componentWillUpdate() {
    console.log("6. componentWillUpdate 组件将要更新");
  }
  componentDidUpdate() {
    console.log("7. componentDidUpdate 组件更新完成");
  }
}

class SubCounter extends Component {
  componentWillReceiveProps() {
    console.log("1. SubCounter componentWillReceiveProps 组件属性变化");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("3. shouldComponentUpdate 询问组件是否需要更新");
    if (nextProps.number % 3 === 0) {
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    console.log("3. componentWillUnmount 组件将要卸载");
  }
  render() {
    console.log("2. SubCounter render 渲染，也就是挂载-------------------");
    return (
      <div style={{ border: "5px solid green", padding: "10px" }}>
        {this.props.number}
      </div>
    );
  }
}
