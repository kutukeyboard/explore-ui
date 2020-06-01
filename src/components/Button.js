import React from "react";

const Button = (props) => {
  let myStyle = {};

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const getClass = () => {
    let myClass = "btn";

    if (props.size) {
      myClass += " " + props.size;
    }

    if (props.disabled) {
      myClass += " disabled";
    } else {
      if (props.theme) {
        myClass += " " + props.theme;
      }
    }

    if (props.className) {
      return myClass + " " + props.className;
    } else {
      return myClass;
    }
  };

  if (props.style) {
    myStyle = { ...myStyle, ...props.style };
  }

  return (
    <button
      disabled={props.disabled}
      className={getClass()}
      onClick={handleClick}
      style={myStyle}
    >
      <div>{props.children}</div>
    </button>
  );
};

export default Button;
