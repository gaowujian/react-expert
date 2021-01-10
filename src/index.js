import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={User} />
          <Route path="/profile" component={Profile} />
        </Router>
      </div>
    );
  }
}

function Home(props) {
  console.log(props);
  return (
    <div>
      <h1>home</h1>
      <button
        onClick={() => {
          props.history.push("/user", { name: "tony" });
        }}
      >
        push
      </button>
    </div>
  );
}
function Profile() {
  return <div>Profile</div>;
}
function User(props) {
  return (
    <div>
      User
      <button
        onClick={() => {
          props.history.goBack();
        }}
      >
        回退
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
