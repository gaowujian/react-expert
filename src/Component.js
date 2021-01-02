// * 当前是使用了一个公用的queue，在每次进入批量更新设置true，更新完毕之后设为false
// * 一次批量更新中，可能会有多个类组件，所以需要一个updaters数组
import { createDOM } from "./react-dom";
export let updateQueue = {
  updaters: [],
  isBatchingUpdate: false,
  add(updater) {
    this.updaters.push(updater);
  },
  batchUpdate() {
    this.updaters.forEach((updater) => updater.updateComponent());
    this.isBatchingUpdate = false;
  },
};

/**
 * 负责处理一个类实例的更新任务
 * * 由于一个updater实例可以拿到一个类实例，所以只要类实例能做的，updater都能做，划分出来是为了职责清楚
 * * 明确一个观点，更新操作，都是先缓存行为，然后根据当前模式再去处理这些缓存行为
 * @class Updater
 */
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    // *缓存类实例上发生的更新行为
    this.pendingStates = [];
  }

  /**
   *  先缓存更新行为，再根据当前模式选择立即更新或者其他
   *
   * @param {*} partialState
   * @memberof Updater
   */
  addState(partialState) {
    this.pendingStates.push(partialState);
    updateQueue.isBatchingUpdate
      ? updateQueue.add(this)
      : this.updateComponent();
  }

  /**
   * 负责去让绑定的类组件去拿取缓存中的状态，并更新视图
   *
   * @memberof Updater
   */
  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      classInstance.state = this.getState();
      classInstance.forceUpdate();
    }
  }

  /**
   * 拿到 pendingstates 中的缓存状态并触发
   * 1. 如果是对象形式，会把之前的状态覆盖
   * 2. 如果是函数形式，拿到最新的状态，再去合并
   * @return {*}
   * @memberof Updater
   */
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance;
    if (pendingStates.length > 0) {
      pendingStates.forEach((nextState) => {
        if (typeof nextState === "function") {
          nextState = nextState.call(classInstance, state);
        }
        state = { ...state, ...nextState };
      });
      pendingStates.length = 0;
    }
    return state;
  }
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  /**
   * component把状态更新和渲染视图的指责委托给了Updater
   * @param {*} partialState
   * @param {*} callback
   * @memberof Component
   */
  setState(partialState, callback) {
    this.updater.addState(partialState);
  }

  /**
   *
   * 用于强制更新刷新组件状态
   * @memberof Component
   */
  forceUpdate() {
    let newVdom = this.render();
    updateClassComponent(this, newVdom);
  }
}

function updateClassComponent(classInstance, newVdom) {
  let oldDOM = classInstance.dom;
  let newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;
