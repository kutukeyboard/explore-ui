import React from "react";

const Alert = (props) => {
  const getClass = () => {
    let myClass = "alert";

    if (props.size) {
      myClass += " " + props.size;
    }
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
    <div className={getClass()}>
      <div>{props.children}</div>
      <div className="closeBtn" onClick={() => props.onClose()}>
        X
      </div>
    </div>
  );
};

export default Alert;
