import React, { useEffect, useState } from "react";

const Carousel = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  let myStyle = {};

  const getClass = () => {
    let myClass = "carousel";
    let myTheme = "default";

    if (props.theme) {
      myClass += " " + props.theme;
    } else {
      myClass += " " + myTheme;
    }

    if (props.className) {
      return myClass + " " + props.className;
    } else {
      return myClass;
    }
  };

  const togglePlay = () => {
    setIsActive(!isActive);
  };

  const setDots = (elementId) => {
    if (props.data) {
      var elements = document.getElementsByTagName("span");

      [...elements].forEach((item) => {
        if (item.id == elementId) {
          item.className = "dot active";
        } else {
          item.className = "dot";
        }
      });
    }
  };

  useEffect(() => {
    setDots(activeImage);
  }, [activeImage]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      setDots(activeImage);
      interval = setInterval(() => {
        if (seconds < 3) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0);
          if (activeImage < props.data.length - 1) {
            setActiveImage(activeImage + 1);
          } else {
            setActiveImage(0);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleArrowClick = (direction) => {
    if (direction == "left") {
      if (activeImage > 0) {
        setActiveImage(activeImage - 1);
      }
    } else {
      if (activeImage < props.data.length - 1) {
        setActiveImage(activeImage + 1);
      }
    }
  };

  if (props.style) {
    myStyle = { ...myStyle, ...props.style };
  }

  return (
    <div className={getClass()} style={myStyle} onMouseOver={togglePlay} onMouseLeave={togglePlay}>
    
      <i className="arrow left" onClick={() => handleArrowClick("left")}></i>
      {props.data && <img src={props.data[activeImage].image} />}

      <i className="arrow right" onClick={() => handleArrowClick("right")}></i>
      <div className="bullets">
        {props.data &&
          props.data.map((r, i) => {
            return <span id={i} className="dot" key={i} onClick={() => setActiveImage(i)}></span>;
          })}
      </div>
    </div>
  );
};

export default Carousel;
