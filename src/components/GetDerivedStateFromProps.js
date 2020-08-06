import React, { Component } from "react";

export default class NewLifeCycle extends Component {
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
  }
  add = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div style={{ border: "5px solid red", padding: "10px" }}>
        <h1>app name: {this.props.name}</h1>
        <p>number:{this.state.number}</p>
        <button onClick={this.add}>+</button>
        <SubCounter number={this.state.number} />
      </div>
    );
  }
}

class SubCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  // 根据新的属性对象派生状态对象 新的属性对象和旧的状态对象
  // 在过去的时候，一个组件可能或者props也可能获得state，现在统一把他们映射为state，返回值和this.state合并
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("2 getDerivedStateFromProps");

    if (nextProps.number % 2 === 0) {
      return {
        number: prevState.number + nextProps.number * 2,
        date: Date(),
      };
    } else {
      return {
        number: prevState.number + nextProps.number * 3,
        date: Date(),
      };
    }
  }

  render() {
    return (
      <div style={{ border: "5px solid green", padding: "10px" }}>
        <p>props number: {this.props.number}</p>
        <p>props number: {this.state.number}</p>
        <p>当前时间: {this.state.date}</p>
      </div>
    );
  }
}
