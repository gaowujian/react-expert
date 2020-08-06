function setState() {
  console.log("setstate");
}

// 实现一个效果 在执行perform的时候，先执行wrapper的initialize方法，然后执行anyMethod传入方法，最后调用wrapper的close方法
// 这样我们可以用来去优化react中的trigger方法，优化批量更新的开启和关闭操作
class Transaction {
  constructor(wrappers) {
    this.wrappers = wrappers; //{initialize,close}
  }
  perform(anyMethod) {
    this.wrappers.forEach((wrapper) => {
      wrapper.initialize();
    });
    anyMethod();
    this.wrappers.forEach((wrapper) => {
      wrapper.close();
    });
  }
}

let transaction = new Transaction([
  {
    initialize: () => {
      console.log("init1");
    },
    close: () => {
      console.log("close1");
    },
  },
  {
    initialize: () => {
      console.log("init2");
    },
    close: () => {
      console.log("close2");
    },
  },
]);

transaction.perform(setState);
