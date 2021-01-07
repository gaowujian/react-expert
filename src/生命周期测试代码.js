import React from "./react";
import ReactDOM from "./react-dom";
import "./style.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    console.log("Parent Counter: constructor初始化");
  }
  componentWillMount() {
    console.log("Parent Counter: willmount 将要挂载");
  }
  componentDidMount() {
    console.log("Parent Counter: didmount 挂载完成");
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("Parent counter will update将要更新");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Parent counter did update更新完成");
  }
  componentWillUnmount() {
    console.log("Parent counter will unmount将要卸载");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Parent counter should component update 询问是否更新");
    return nextState.number % 2 === 0;
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    console.log("parent counter:render 创建vdom");
    return (
      <div id={this.state.number + "counter"}>
        <h1>count:{this.state.number}</h1>
        {this.state.number === 4 ? null : (
          <ChildCounter number={this.state.number} />
        )}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    console.log("Child Counter: constructor初始化");
  }
  componentWillMount() {
    console.log("Child Counter: willmount将要挂载");
  }
  componentDidMount() {
    console.log("Child Counter: didmount挂载完成");
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("Child counter will update 将要更新");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Child counter did update完成更新");
  }
  componentWillUnmount() {
    console.log("Child counter will unmount将要卸载");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Child counter should component update 询问是否更新");
    return nextProps.number % 3 === 0;
  }

  render() {
    console.log("Child counter:render 生成vdom");
    return <h1>child count:{this.props.number}</h1>;
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
