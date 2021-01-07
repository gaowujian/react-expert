import { REACT_TEXT } from "./constant";
/**
 * 把文本string，number也包装成 react元素,添加一个type，方便dom-diff
 *
 * @export
 */
export function wrapToVdom(element) {
  return typeof element === "string" || typeof element === "number"
    ? { type: REACT_TEXT, props: { content: element } }
    : element;
}
