import { updateQueue } from "./Component";
/**
 * 该函数的的触发是在渲染阶段就执行，开始进行合成事件的组装
 * 把事件类型和触发函数都存储在store里，并绑定在元素的实例上，而不是直接调用，
 * 这样之后，别人拿到实例之后，也知道该实例绑定过哪些事件，还可以实现延迟触发
 * * 给一个dom元素上挂载一个store，表示该dom元素可以处理哪些事件
 * * !document[eventType]不用每次触发都销毁，因为每次冒泡到document的原生event也不一样，target不同
 * @export
 * @param {*} dom
 * @param {*} eventType
 * @param {*} listener
 */
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener; // dom.store.onclick=handleClick
  if (!document[eventType]) {
    document[eventType] = dispatchEvent; //document.onclick=dispatchEvent
  }
}

/**
 *
 * event是原生的DOM事件对象，从触发事件的元素冒泡至document元素被处理
 * * 先创建好一个包装过的合成事件对象，然后从原生事件的target目标开始，不停的执行listener并把合成事件对象传递进去
 * * 其实button的原生事件已经触发过了，并且冒泡到了document
 * * 我们没有把事件处理函数绑定到原生的html节点上，而是把函数缓存起来，由document代理之后，再以合成事件的形式派发
 * !! button原生事件(null) > document原生事件(封装合成事件对象) > button合成事件(用户所见)
 * @param {*} event
 */
function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  let syntheticEvent = createSyntheticEvent(event);
  while (target) {
    let { store } = target;
    let listener = store && store[eventType];
    listener && listener.call(target, syntheticEvent);
    target = target.parentNode;
  }
  for (let key in syntheticEvent) {
    syntheticEvent[key] = null;
  }
  updateQueue.batchUpdate();
}

/**
 * 根据冒泡到document中的原生事件，去生成一个合成事件对象
 *
 * @param {*} nativeEvent
 * @return {*}
 */
function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  const other = {
    stopping: false,
    stop() {
      this.stopping = true;
      console.log("阻止冒泡");
    },
  };
  syntheticEvent = { ...syntheticEvent, ...other };

  return syntheticEvent;
}
