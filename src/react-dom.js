function render(element, parentNode) {
  // 判断element的类型
  if (typeof element === "string") {
    parentNode.appendChild(document.createTextNode(element));
    return;
  }
}

export default { render };
