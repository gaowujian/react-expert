// * 逐步抽象公共的方法到一个父类
// *实现事件委托, 把事件挂载到全局，实现事件的触发
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
    const newElement = this.renderElement();
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
  // 把原来的render逻辑抽到这个方法中,创建domElement
  renderElement() {
    const renderString = this.render();
    this.domElement = this.createDomElementFromDomString(renderString);
    // 让这个button的component属性等于当前Counter组件的实例，用来之后委托事件
    this.domElement.component = this;
    return this.domElement;
  }
  // 挂载 domElement
  mount(container) {
    container.appendChild(this.renderElement());
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
    return `<button onclick="trigger(event,'add')">${this.props.name}${this.state.number} </button>`;
  }
}
window.trigger = (event, method, ...args) => {
  event.target.component[method].call(event.target.component, event, ...args);
};
new Counter({ name: "tony" }).mount(document.getElementById("root"));
