import React from "./react";
import ReactDOM from "./react-dom";

// function Welcome() {
//   return (
//     <div className="container" title="我是一个title" style={{ color: "red" }}>
//       hello <span>world!</span>
//     </div>
//   );
// }
// ==>等价于
// function Welcome() {
//   return /*#__PURE__*/ React.createElement(
//     "div",
//     {
//       className: "container",
//       title: "\u6211\u662F\u4E00\u4E2Atitle",
//       style: {
//         color: "red",
//         fontSize: "28px",
//       },
//     },
//     "hello ",
//     /*#__PURE__*/ React.createElement("span", null, "world!")
//   );
// }

class Welcome extends React.Component {
  render() {
    return React.createElement(
      "div",
      {
        className: "container",
        title: "\u6211\u662F\u4E00\u4E2Atitle",
        style: {
          color: "red",
          fontSize: "28px",
        },
      },
      "hello ",
      /*#__PURE__*/ React.createElement("span", null, "world!")
    );
  }
}

// <Welcome/>
// ==>等价于
// React.createElement(Welcome, null);
// const element = Welcome();

const element = React.createElement(Welcome, null);

ReactDOM.render(element, document.getElementById("root"));
