import React, { Component } from "react";

export default class GetSnapshotBeforeUpdate extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        messages: [...this.state.messages, this.state.messages.length],
      });
    }, 1000);
  }
  // 函数的返回值会交给componentDidUpdate的第三个参数
  static getSnapshotBeforeUpdate() {
    return this.wrapper.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, prevScrollHeight) {
    this.wrapper.current.scrollTop =
      this.wrapper.current.scrollHeight - prevScrollHeight;
  }
  render() {
    const style = {
      height: "100px",
      width: "200px",
      border: "1px solid red",
      overflow: "auto",
    };
    return (
      <ul style={style} ref={this.wrapper}>
        {this.state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }
}
