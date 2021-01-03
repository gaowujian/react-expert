import React from "./react";
import ReactDOM from "./react-dom";
import "./style.css";
class Counter extends React.Component {
  static defaultProps = {
    title: "默认计数器",
  };
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log("1. constructor初始化属性和状态对象");
  }
  componentWillMount() {
    console.log("2. componentWillMount组件将要加载 ");
  }

  componentDidMount() {
    console.log("4. componentDidMount组件加载完毕 ");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. shouldComponentUpdate询问组件是否需要更新 ");
    return nextState.number % 2 === 0;
  }

  componentWillUpdate() {
    console.log("6. componentWillUpdate组件将要更新 ");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("7. componentDidMount组件更新完成 ");
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };
  render() {
    console.log("3. render ");

    return (
      <div id={`counter-${this.state.number}`}>
        <h1>name:{this.props.title}</h1>
        {/* <p>自己的number:{this.state.number}</p>
        <p>
          {this.state.number === 4 ? null : (
            <ChildCounter number={this.state.number} />
          )}
        </p> */}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

class ChildCounter extends React.Component {
  componentWillMount() {
    console.log("2. child componentWillMount组件将要加载 ");
  }

  componentDidMount() {
    console.log("4. child componentDidMount组件加载完毕 ");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. child shouldComponentUpdate询问组件是否需要更新 ");
    return true;
  }

  componentWillUpdate() {
    console.log("6. child componentWillUpdate组件将要更新 ");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("7. child componentDidMount组件更新完成 ");
  }

  render() {
    return (
      <div>
        <h1>count:{this.props.number}</h1>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
