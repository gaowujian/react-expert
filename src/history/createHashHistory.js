const createHashHistory = () => {
  // 默认行为
  let action;
  let listeners = [];
  // hashhistory需要自己维护一个栈和路由跳转时候携带的state
  let historyStack = []; //
  let historyIndex = -1;
  let state;
  function listen(listener) {
    listeners.push(listener);
    return () => {
      //   let idx = listeners.indexOf(listener);
      //   listeners.splice(idx, 1);
      //   等价于
      listeners = listeners.filter((item) => item !== listener);
    };
  }

  //   添加hashchange的监听函数
  window.addEventListener("hashchange", () => {
    let pathname = window.location.hash.slice(1) || "/";
    // 针对 xxx/#的路由跳转
    if (pathname === "/") {
      window.location.hash = "/";
    }
    if (action === "PUSH") {
      // 覆盖操作，而不是不同的进栈出栈操作
      historyStack[++historyIndex] = history.location;
    }

    // 修改传入Router的history值
    Object.assign(history, { action, location: { pathname, state } });
    // 回调负责修改router内的state值，触发页面的渲染
    listeners.forEach((listener) => {
      listener(history.location);
    });
  });

  /**
   *
   * 修改 window.location.hash的值，从而触发hashchange的⌚️
   * 调用回调函数来执行页面的重新渲染
   * @param {*} pathname
   */
  //   push行为
  function push(pathname, nextState) {
    action = "PUSH";
    // 兼容 push的不同参数
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    //   给hash值赋值不需要 #, 但是取出的时候带#
    window.location.hash = pathname;
  }
  //   pop行为
  function go(n) {
    action = "POP";
    historyIndex += n;
    let nextLocation = historyStack[historyIndex] || {};
    state = nextLocation.state;
    window.location.hash = nextLocation.pathname;
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  const history = {
    action,
    location: {
      pathname: window.location.hash.slice(1) || "/",
      state,
    },
    go,
    goBack,
    goForward,
    listen,
    push,
  };
  //   window.location.hash = window.location.hash.slice(1) || "/";
  return history;
};

export default createHashHistory;
