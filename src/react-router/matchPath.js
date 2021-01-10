import pathToRegExp from "path-to-regexp";

// 字符串转正则
function compilePath(path, options = {}) {
  const keys = [];
  const regExp = pathToRegExp(path, keys, options);
  return [keys, regExp];
}

/**
 * @param {*} pathname 浏览器的真实route
 * @param {*} options Route的属性
 */
const matchPath = (pathname, options) => {
  const { path, exact = false, strict = false, sensitive = false } = options;
  const [keys, regExp] = compilePath(path, { end: exact, strict, sensitive });
};

export default matchPath;
