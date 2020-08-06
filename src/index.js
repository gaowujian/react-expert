//*引入事务，优化trigger方法

let batchingStrategy = {
  isBatchingUpdates: false, //默认是非批量更新的模式
  dirtyComponents: [], //存储所有的脏组件（组件的状态和页面显示不一样就是脏组件）
  batchedUpdates() {
    this.dirtyComponents.forEach((component) => {
      component.updateComponent();
    });
  },
};
class Updater {
  constructor(component) {
    this.component = component;
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    // 如果是批量更新，缓存起来，如果不是，组件立即去更新
    if (batchingStrategy.isBatchingUpdates) {
      batchingStrategy.dirtyComponents.push(this.component);
    } else {
      this.component.updateComponent();
    }
  }
}
class Component {
  constructor(props) {
    this.props = props;
    this.$updater = new Updater(this);
  }
  updateComponent() {
    this.$updater.pendingStates.forEach((partialState) => {
      this.state = Object.assign(this.state, partialState);
    });
    // 清空更新队列
    this.$updater.pendingStates.length = 0;
    // 执行更新
    const oldElement = this.domElement;
    const newElement = this.renderElement();
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
  createDomElementFromDomString(domString) {
    const div = document.createElement("div");
    div.innerHTML = domString;
    return div.children[0];
  }
  setState(partialState) {
    // 缓存修改
    this.$updater.addState(partialState);
  }

  renderElement() {
    const renderString = this.render();
    this.domElement = this.createDomElementFromDomString(renderString);
    this.domElement.component = this;
    return this.domElement;
  }

  mount(container) {
    container.appendChild(this.renderElement());
  }
}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 10,
    };
  }

  add = () => {
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
    }, 0);
  };
  render() {
    return `<button onclick="trigger(event,'add')">${this.props.name}${this.state.number} </button>`;
  }
}

class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers; //{initialize,close}
  }
  perform(anyMethod) {
    this.wrappers.forEach((wrapper) => {
      wrapper.initialize();
    });
    anyMethod();
    this.wrappers.forEach((wrapper) => {
      wrapper.close();
    });
  }
}

let transaction = new Transaction([
  {
    initialize: () => {
      batchingStrategy.isBatchingUpdates = true;
    },
    close: () => {
      batchingStrategy.isBatchingUpdates = false;
      // 把所有的脏组件根据自己的状态和视图进行重新更新
      batchingStrategy.batchedUpdates();
    },
  },
]);
window.trigger = (event, method, ...args) => {
  const component = event.target.component;
  transaction.perform(component[method].bind(component, event, ...args));
};
new Counter({ name: "tony" }).mount(document.getElementById("root"));
