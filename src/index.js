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
    this.setState({ number: this.state.number + 1 }, (newState) => {
      console.log(newState);
    });
  };
  render() {
    console.log("3. render ");

    return (
      <div>
        <h1>name:{this.props.title}</h1>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter title="自定义计数器" />,
  document.getElementById("root")
);
