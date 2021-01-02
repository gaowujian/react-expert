import Updater from "./Updater";
import { createDOM } from "./react-dom";
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
