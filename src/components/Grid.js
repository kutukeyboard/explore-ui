import React from "react";
import "../style/style.scss";

const Grid = (props) => {
  let myClass = "grid";
  let myStyle = {};

  const getClass = () => {
    props.type == "row" ? (myClass += " row") : (myClass += " col");

    return myClass + " " + props.className;
  };

  if (props.minWidth) {
    myStyle["--colWidth"] = props.minWidth;
  } else {
    myStyle["--colWidth"] = "200px";
  }

  if (props.gap && props.gap > 0) {
    myStyle["gap"] = props.gap;
  }
  return (
    <div className={getClass()} style={myStyle}>
      {props.children}
    </div>
  );
};

export default Grid;
