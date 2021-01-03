import { addEvent } from "./event";
/**
 * render函数就是一个挂载函数，把一个vdom渲染到他的父节点上
 * 1.把vdom转化为真实dom
 * 2.把真实dom插入到父节点上
 */
function render(vdom, container) {
  const dom = createDOM(vdom);
  container.appendChild(dom);
  // 挂载到父容器之后才能执行组件的componentDidMount
  if (dom.componentDidMount) {
    dom.componentDidMount();
  }
}

/**
 *  根据vdom创建的真实dom
 *  在创建真实dom的过程中，需要根据vdom的类型，分情况讨论
 *  1. 空值, 但是不包含0
 *  1. string或者number
 *  2. 原生组件
 *  3. 函数组件
 *  4. 类组件
 */
export function createDOM(vdom) {
  let dom;
  if (!vdom && vdom != 0) {
    return document.createTextNode("");
  } else if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  } else {
    const { type } = vdom;
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
 * 一个原生组件的vdom绑定了一个dom属性，用在了findDOM函数中
 */
function createNativeDOM(vdom) {
  const { type, props } = vdom;
  const dom = document.createElement(type);
  updateProps(dom, props);
  if (props.children) {
    reconcileChildren(props.children, dom);
  }
  //只有原生组件的vdom上才有一个dom
  vdom.dom = dom;
  return dom;
}

/**
 * 把props的的添加主要分为两部分 非children属性和children属性
 * 第一次渲染的之后，只有newProps传入
 * 之后更新的时候，可能会传入oldProps
 */
function updateProps(dom, newProps, oldProps) {
  for (const key in newProps) {
    if (key === "style") {
      const styleObj = newProps[key];
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key === "children") {
      continue;
    } else if (key.startsWith("on")) {
      // ! 需要实现合成事件
      addEvent(dom, key.toLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}

/**
 * 调和props.children,主要负责处理props中的children属性值, 设置return是为了防止陷入多个分支中去
 * 1. string和number, 直接设置成dom的文本内容
 * 2. 单个object对象, 即react原生组件, 插入当前父亲的真实dom，
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
 *
 * 1. 创建一个函数组件的真实dom  {type:Function,props:{}, dom:}
 * 2. vdom上绑定返回的renderVdom
 *
 */
function createFunctionComponentDOM(vdom) {
  const { type, props } = vdom;
  const renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  const dom = createDOM(renderVdom);
  return dom;
}

/**
 * 创建一个类组件的真实dom
 * * 主要有三个操作，
 * 1. vdom上绑定了classInstance, 方便拿生命周期函数
 * 2. vdom上绑定返回的renderVdom, 方便拿渲染的内容
 * 3. classInstance上绑定返回的renderVdom, 方便拿渲染的内容
 * 4. classInstance上绑定了dom，用于暴力更新dom
 * 
 * 查找关系 vdom=> classInstance => dom
 *        vdom => renderVdom
 *        classInstance => renderVdom
 * 
 * 通过 findDom可以实现 vdom => dom, 
 * 如果是原生组件可以直接拿到 dom，
 * 如果不是，可以先拿到renderVdom，再拿dom
 * 
 
 * 
 * @param {*} vdom
 */
function createClassComponentDOM(vdom) {
  let { type, props } = vdom;
  if (type.defaultProps) {
    props = { ...type.defaultProps, ...props };
  }
  const classInstance = new type(props);
  vdom.classInstance = classInstance; // 1
  // ???测试用
  classInstance.vdom = vdom;

  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  const renderVdom = classInstance.render();
  vdom.oldRenderVdom = renderVdom; // 2
  classInstance.oldRenderVdom = renderVdom; //3

  const dom = createDOM(renderVdom);

  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
  }
  // ? 有了findDOM之后，这个就没有必要了。之前是为了进行组件的暴力更新
  classInstance.dom = dom; //4.
  return dom;
}

/**
 * 对当前组件进行一个次dom diff, 并执行dom的修改操作
 * @param {*} parentNode  当前组件挂载的父亲的真实dom节点 <div id="root"><div>
 * @param {*} oldVdom 指的是 {type:div} 也就是oldRenderVdom
 * @param {*} newVdom
 * 分情况讨论
 * 1. 新老vdom都没有
 * 2. 老的vdom有，新的没有 需要删除 例如开始有childCounter 更新后没有
 * 3. 老的没有, 新的有 需要插入
 * 4. 老的有，新的也有，但是类型不同，需要删除然后插入
 * 5. 老的有，新的也有，需要做深层的dom diff
 */
export function compareTwoVdom(parentNode, oldVdom, newVdom, nextDOM) {
  // debugger;
  if (!oldVdom && !newVdom) {
    return;
  } else if (oldVdom && !newVdom) {
    const currentDom = findDOM(oldVdom);
    if (currentDom) {
      parentNode.removeChild(currentDom);
    }
    if (oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    return;
  }
  //可能是在中间插入
  else if (!oldVdom && newVdom) {
    let newDom = createDOM(newVdom);
    if (nextDOM) {
      parentNode.insertBefore(newDom, nextDOM);
    } else {
      parentNode.appendChild(newDom);
    }
    return;
  }
  // 新的有，老的也有，但是类型不同
  else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    const oldDom = findDOM(oldVdom);
    const newDom = createDOM(newVdom);
    parentNode.replaceChild(newDom, oldDom);
    if (oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
    return;
  }
  //新的有，老的也有，且类型相同, 需要更新属性，并进行深度的子节点dom diff
  else {
    updateElement(oldVdom, newVdom);
    return;
  }
}

/**
 * 深度比较两个虚拟dom
 *
 * @param {*} oldVdom  <div id="counter">
 * @param {*} newVdom <div id="counter">
 */
function updateElement(oldVdom, newVdom) {
  // 先更新属性
  if (typeof oldVdom.type === "string") {
    //让新的vdom复用老的真实dom
    let currentDom = (newVdom.dom = oldVdom.dom);
    updateProps(currentDom, newVdom.props, oldVdom.props);
  }
}

/**
 * 针对vdom返回其真实dom,
 * 1. 如果是原生组件，vdom对应了一个真实dom
 * 2. 对于函数组件和类组件，他们的render结果对应了一个真实dom
 *  例如一个函数组件 {type:Counter} 找到 vdom.oldRenderVdom {type:div}, 再使用dom找到div的真实dom节点
 * @param {*} vdom
 */
export function findDOM(vdom) {
  const { type } = vdom;
  let dom;
  if (typeof type === "function") {
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom;
  }
  return dom;
}

const ReactDOM = {
  render,
};

export default ReactDOM;
