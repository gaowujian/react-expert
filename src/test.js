import { updateQueue } from "./Updater";

function dispatchEvent(e) {
  const { target, type } = e;
  updateQueue.isBatchingUpdate = true;
  const eventType = "on" + type;
  while (target) {
    const { store = {} } = target;
    const { listener } = store;
    const synthecitie = e;
    listener && listener.call(target, synthecitie);
    target = target.parentNode;
  }
  updateQueue.batchUpdate();
}
