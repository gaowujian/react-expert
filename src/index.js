import React from "./react";
import ReactDOM from "./react-dom";

// function Welcome() {
//   return (
//     <div style={{ color: "red" }}>
//       hello <span>world!</span>
//     </div>
//   );
// }
// ==>等价于
function Welcome() {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      style: {
        color: "red",
      },
    },
    "hello ",
    /*#__PURE__*/ React.createElement("span", null, "world!")
  );
}

// <Welcome/>
// ==>等价于
// React.createElement(Welcome, null);
const element = Welcome();

ReactDOM.render("hello", document.getElementById("root"));
