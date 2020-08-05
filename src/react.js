function createElement(type, config = {}, children) {
  let propName;
  const props = {};
  for (propName in props) {
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

export default { createElement };

function ReactElement(type, props) {
  const element = { type, props };
  return element;
}
