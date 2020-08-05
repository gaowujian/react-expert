function render(element, parentNode) {
  //   console.log("element", element);
  //   console.log("parentNode", parentNode);
  // 判断element的类型
  // 如果是文本节点，可能是string或者是number类型
  if (typeof element === "string" || typeof element === "number") {
    parentNode.appendChild(document.createTextNode(element));
    // 直接return，因为新进来的element是一个text节点,再向下走是其他类型节点的判断
    return;
  }

  let type, props;
  console.log(element);
  type = element.type;
  props = element.props;
  console.log(type, props);
  //   如果是函数组件，element = >
  //   type: Welcome(){}
  //  props: {children:[] } 默认值,如果形如 <Welcome />
  if (typeof type === "function") {
    const returnedElement = type(props);
    type = returnedElement.type;
    props = returnedElement.props;
    // type=> "div"
    // props=> {
    //   className: "container",
    //   title: "我是一个title",
    //   style: { color: "red", fontSize: "28px" },
    //   children: ["hello ", { type: "span", props: { children: "world!" } }],
    // };
  }
  //   创建真实dom
  let domElement = document.createElement(type);
  //   处理props中的属性(className,style,children和其他属性)
  for (const propName in props) {
    if (propName === "className") {
      domElement.className = props[propName];
    } else if (propName === "style") {
      const styleObj = props[propName];
      for (const attr in styleObj) {
        domElement.style[attr] = styleObj[attr];
        console.log(domElement.style.attr);
      }
    } else if (propName === "children") {
      // 如果children是一个节点，那么就是一个单个元素，也放进一个数组中做统一处理
      // 这一步也可以在React.createElement中处理children属性的时候直接放进一个数组中去
      let children = Array.isArray(props.children)
        ? props.children
        : [props.children];
      // 递归处理
      //   console.log(domElement);
      children.forEach((child) => render(child, domElement));
    } else {
      domElement.setAttribute(propName, props[propName]);
    }
  }
  parentNode.appendChild(domElement);
}

export default { render };
