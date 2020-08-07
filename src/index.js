import React from "react";
import ReactDOM from "react-dom";

function Fragment(props) {
  return props.children;
}
export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
