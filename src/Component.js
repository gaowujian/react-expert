import Updater from "./Updater";
import { compareTwoVdom, createDOM } from "./react-dom";
class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  /**
   * component把状态更新和渲染视图的指责委托给了Updater
   */
  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }

  /**
   * 用于强制更新刷新组件状态
   * @memberof Component
   */
  forceUpdate() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    const newRenderVdom = this.render();
    const oldRenderVdom = this.oldRenderVdom;
    const oldDom = oldRenderVdom.dom;
    // 实现简易的dom-diff
    compareTwoVdom(oldDom.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
    // updateClassComponent(this, newVdom);
    if (this.componentDidUpdate) {
      this.componentDidUpdate();
    }
  }
}

function updateClassComponent(classInstance, newVdom) {
  let oldDOM = classInstance.dom;
  let newDOM = createDOM(newVdom);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;
