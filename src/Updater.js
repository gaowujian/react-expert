// * 当前是使用了一个公用的queue，在每次进入批量更新设置true，更新完毕之后设为false

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
    // * 缓存类实例上的setState
    this.pendingStates = [];
  }

  /**
   * 先缓存setState,根据模式去决定是否去理解计算最新state并更新
   * 如果没有在批量更新状态，立即去更新组件，这时候缓存数组一般只有一个元素，拿到后计算最新状态并更新
   * 如果处于批量更新状态，把当前的updater扔进一个队列中，等之后批量迭代更新
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
      debugger;
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

export default Updater;
