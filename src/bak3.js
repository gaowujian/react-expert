// * 逐步抽象公共的方法到一个父类
// *抽象createDomElementFromDomString，add 方法
class Component {
  constructor(props) {
    this.props = props;
  }
  createDomElementFromDomString(domString) {
    const div = document.createElement("div");
    div.innerHTML = domString;
    return div.children[0];
  }
  // 这就是为什么要用this.setState，而不是this.state的问题，因为this.setState有更新dom操作
  setState(partialState) {
    // 更新state
    this.state = Object.assign(this.state, partialState);
    // 更新dom
    const oldElement = this.domElement;
    const newElement = this.render();
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  add = () => {
    this.setState({ number: this.state.number + 1 });
    // this.state = { number: this.state.number + 1 };
  };
  render() {
    this.domElement = this.createDomElementFromDomString(
      `<button>${this.props.name}${this.state.number} </button>`
    );
    this.domElement.addEventListener("click", this.add);

    return this.domElement;
  }
}

document
  .getElementById("root")
  .appendChild(new Counter({ name: "tony" }).render());
