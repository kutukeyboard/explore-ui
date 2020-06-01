import React from "react";

import Arrow from "../icons/arrow.svg";

const BackTop = (props) => {
  return (
    <div
      className="exArrowWrap"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <Arrow className="exArrow" />
    </div>
  );
};

export default BackTop;
