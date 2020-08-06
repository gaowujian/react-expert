// 使用原生js 和 dom来模拟react
// 学习setstate和事务的原理

// 1. 先把原生js和dom抽象进类中
// 2.在模板串中加入自身的状态
// 3. 给dom绑定事件
// 4. 用新创建的节点来替换老节点（包括保存老节点的操作和dom的替换操作）

// ？为什么不能通过修改this.state来修改状态!!
// 当前的缺陷
// 1. dom操作多，创建新节点，替换老节点
// 2. 渲染部分的代码冗余，不好利用
// *使用类来管理之前的逻辑

class Counter {
  constructor() {
    this.state = {
      number: 0,
    };
  }
  createDomElementFromDomString(domString) {
    const div = document.createElement("div");
    div.innerHTML = domString;
    return div.children[0];
  }
  add = () => {
    this.state.number += 1;
    const oldElement = this.domElement;
    const newElement = this.render();
    oldElement.parentElement.replaceChild(newElement, oldElement);
  };
  render() {
    this.domElement = this.createDomElementFromDomString(
      `<button>${this.state.number} </button>`
    );
    this.domElement.addEventListener("click", this.add);

    return this.domElement;
  }
}

document.getElementById("root").appendChild(new Counter().render());
