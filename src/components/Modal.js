import React from "react";
import Button from "./Button";

const Modal = (props) => {
  const getClass = () => {
    let myClass = "exModal";

    if (props.theme) {
      myClass += " " + props.theme;
    }
    if (props.className) {
      return myClass + " " + props.className;
    } else {
      return myClass;
    }
  };

  return (
    <div className="exModalContainer">
      <div className={getClass()}>
        <div className="exModalHeader">
          <p className="exModalTitle">{props.title}</p>
          <Button
            size="small"
            className="exModalButton"
            onClick={() => props.onClose()}
          >
            x
          </Button>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
