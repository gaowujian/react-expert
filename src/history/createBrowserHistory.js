const createBrowserHistory = () => {
  const globalHistory = window.history;

  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    globalHistory.go(-1);
  }
  function goForward() {
    globalHistory.go(1);
  }
  let action;
  let listeners = [];
  let state;
  function listen(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }

  function notify(newHistory) {
    Object.assign(history, newHistory);
    listeners.forEach((listener) => {
      listener(history.location);
    });
  }

  function push(pathname, nextState) {
    action = "PUSH";
    // 兼容 push的不同参数
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    // 原生API,可以用来缓存state
    globalHistory.pushState(state, null, pathname);
    let location = { state, pathname };
    notify({ action, location });
  }

  //   浏览器默认支持
  //  事件响应的时候，pathname和state已经改变
  window.onpopstate = function () {
    notify({
      action: "POP",
      location: {
        pathname: window.location.pathname,
        state: globalHistory.state,
      },
    });
  };

  const history = {
    action,
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state,
    },
    go,
    goBack,
    goForward,
    listen,
    push,
  };
  return history;
};

export default createBrowserHistory;
