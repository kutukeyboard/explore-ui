import React from "react";

const Card = (props) => {
  let myStyle = {};
  let myTheme = "default";

  const getClass = () => {
    let myClass = "card";

    if (props.theme) {
      myTheme = props.theme;
    }

    if (props.border) {
      myClass += " border-" + myTheme;
    }
    if (props.shadow) {
      myClass += " shadow-" + myTheme;
    }
    if (props.rounded) {
      myClass += " rounded";
      myStyle["--rounded"] = props.rounded;
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
    <div className={getClass()} style={myStyle}>
      {props.image && <img src={props.image} />}
      <div className={"title title-" + myTheme}>{props.title}</div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};
export default Card;
