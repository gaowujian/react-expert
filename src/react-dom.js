import { addEvent } from "./event";
/**
 * @param {*} vdom  一个react元素/vdom
 * @param {*} container 一个真实dom节点，作为父节点
 * 分为两步，1. 把vdom转化为真实dom 2.把真实dom插入到父节点上
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
}

/**
 * @param {*} vdom
 * @return {*} 根据vdom创建的真实dom
 *  在创建真实dom的过程中，需要根据vdom的类型，分情况讨论
 *  1. 空值
 *  1. string或者number
 *  2. 原生组件
 *  3. 函数组件
 *  4. 类组件
 */
export function createDOM(vdom) {
  let dom;
  if (!vdom) {
    return document.createTextNode("");
  } else if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  } else {
    const { type, props } = vdom;
    if (typeof type === "function") {
      if (type.isReactComponent) {
        return createClassComponentDOM(vdom);
      } else {
        return createFunctionComponentDOM(vdom);
      }
    }

    if (typeof type === "string") {
      dom = createNativeDOM(vdom);
    }
  }
  return dom;
}

/**
 * 创建原生组件dom, 更新属性，并返回一个包装完整的dom
 * @param {*} vdom
 */
function createNativeDOM(vdom) {
  const { type, props } = vdom;
  const dom = document.createElement(type);
  updateProps(dom, props);
  //这个是为了之后的更新操作
  vdom.dom = dom;
  return dom;
}

/**
 * 把props的的添加主要分为两部分 非children属性和children属性
 * @param {*} dom
 * @param {*} props
 */
function updateProps(dom, props) {
  for (const key in props) {
    if (key === "style") {
      const styleObj = props[key];
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key === "children") {
      reconcileChildren(props[key], dom);
    } else if (key.startsWith("on")) {
      // ! 需要实现合成事件
      addEvent(dom, key.toLowerCase(), props[key]);
    } else {
      dom[key] = props[key];
      //   ? 这里不使用setAttribute的原因在于 jsx 上的className 会被设置为真实dom上的属性 <div className>而不是 <div class>
      //   dom.setAttribute(key, props[key]);
    }
  }
}

/**
 * 调和props.children,主要负责处理props中的children属性值, 设置return是为了防止陷入多个分支中去
 * 1. string和number, 直接设置成dom的文本内容
 * 2. 单个object对象, 插入当前父亲的真实dom，
 * 3. 数组, 循环插入当前父亲的真实dom节点
 * 4. 其余情况
 */
function reconcileChildren(childrenVdom, dom) {
  if (typeof childrenVdom === "string" || typeof childrenVdom === "number") {
    dom.textContent = childrenVdom;
    return;
  } else if (typeof childrenVdom === "object" && childrenVdom.type) {
    render(childrenVdom, dom);
    return;
  } else if (Array.isArray(childrenVdom)) {
    for (let i = 0; i < childrenVdom.length; i++) {
      const childVdom = childrenVdom[i];
      render(childVdom, dom);
    }
    return;
  } else {
    dom.textContent = childrenVdom ? childrenVdom.toString() : "";
  }
}

/**
 * 创建一个函数组件的真实dom
 *
 * @param {*} vdom
 */
function createFunctionComponentDOM(vdom) {
  const { type, props } = vdom;
  const renderVdom = type(props);
  return createDOM(renderVdom);
}

/**
 * 创建一个类组件的真实dom
 * * 主要有两个操作，给类的实例分别绑定上vdom和dom
 * @param {*} vdom
 */
function createClassComponentDOM(vdom) {
  const { type, props } = vdom;
  const classInstance = new type(props);
  const renderVdom = classInstance.render();
  classInstance.oldVdom = renderVdom;
  const dom = createDOM(renderVdom);
  classInstance.dom = dom;
  return dom;
}

const ReactDOM = {
  render,
};

export default ReactDOM;
