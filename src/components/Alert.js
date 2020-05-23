import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
    this.handleClose = this.handleClose.bind(this);
    // this.getClass = this.getClass.bind(this);
  }

  handleClose() {
    this.setState((state) => ({
      active: !state.active,
    }));
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  getClass() {
    let myClass = "alert";

    if (this.props.size) {
      myClass += " " + this.props.size;
    }
    if (this.props.color) {
      if (
        this.props.color == "defult" ||
        this.props.color == "primary" ||
        this.props.color == "secondary" ||
        this.props.color == "success" ||
        this.props.color == "info" ||
        this.props.color == "warning" ||
        this.props.color == "danger"
      ) {
        myClass += " " + this.props.color;
      }
    }
    if (this.props.className) {
      return myClass + " " + this.props.className;
    } else {
      return myClass;
    }
  }

  render() {
    return (
      <div>
        {this.state.active && (
          <div className={this.getClass()}>
            <div>{this.props.children}</div>

            <div className="closeBtn" onClick={this.handleClose}>
              X
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
