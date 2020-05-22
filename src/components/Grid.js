import React from "react";
import "../style/style.scss";

const Grid = (props) => {
  let myClass = "grid";
  let myStyle = {};

  const gridClass = () => {
    props.type == "column" ? (myClass += " col") : (myClass += " row");

    return myClass + " " + props.className;
  };

  if (props.minWidth) {
    myStyle["--colWidth"] = props.minWidth;
  } else {
    myStyle["--colWidth"] = "300px";
  }

  if (props.gap && props.gap > 0) {
    myStyle["gap"] = props.gap;
  }
  return (
    <div className={gridClass()} style={myStyle}>
      {props.children}
    </div>
  );
};

export default Grid;
