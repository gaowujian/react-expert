import Component from "./Component";
/**
 * @param {*} type  react元素的类型
 * @param {*} config  jsx语法传入的配置
 * @param {*} children react元素的子元素
 *  * 如果children是一个就没有必要包装成一个数组!!!
 */
function createElement(type, config, ...children) {
  if (config) {
    delete config.__source;
    delete config.__self;
  }
  const props = { ...config };
  if (children.length > 1) {
    props.children = children;
  } else {
    props.children = children[0];
  }

  return {
    type,
    props,
  };
}
const React = {
  createElement,
  Component,
};

export default React;
