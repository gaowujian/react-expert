function createElement(type, config = {}, children) {
  //   console.log("type", type);
  const props = {};
  for (const propName in config) {
    props[propName] = config[propName];
  }
  // 获取儿子的数量
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else {
    props.children = Array.from(arguments).slice(2);
  }
  return ReactElement(type, props);
}

function ReactElement(type, props) {
  const element = { type, props };
  return element;
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }
}
export default { createElement, Component };
