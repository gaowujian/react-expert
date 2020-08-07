import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.model = document.getElementById("model-root");
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.model);
  }
}

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>显示/关闭</button>
        {this.state.showModal && (
          <Modal>
            <div className="modal">
              <div className="content">
                <header>头部</header>
                <div>内容</div>
                <button onClick={this.toggleModal}>关闭模态框</button>
                <footer></footer>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));
