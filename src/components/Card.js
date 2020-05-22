import React from "react";

const Card = (props) => {
  let myStyle = {};

  const cardClass = () => {
    let myClass = "card";

    if (props.border) {
      myClass += " bordered";
    }
    if (props.rounded) {
      myClass += " rounded";
      myStyle["--rounded"] = props.rounded;
    }
    if (props.shadow) {
      myClass += " shadow";
    }

    return myClass + " " + props.className;
  };

  return (
    <div className={cardClass()} style={myStyle}>
      {props.image && <img src={props.image} />}
      <div className="title">{props.title}</div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};
export default Card;
