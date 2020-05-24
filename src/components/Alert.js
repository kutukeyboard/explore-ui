import React, { useState, useEffect } from "react";

const Alert = (props) => {
  const [active, setActive] = useState();

  const handleClose = () => {
    setActive(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    setActive(true);
  }, []);

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
    <div>
      {active && (
        <div className={getClass()}>
          <div>{props.children}</div>
          <div className="closeBtn" onClick={handleClose}>
            X
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
