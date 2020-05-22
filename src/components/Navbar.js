import React from "react";

const Nanvbar = (props) => {
  let myStyle = {};

  const handleNavClick = () => {
    const cls = document.getElementById("nav-main").className;
    if (cls == "nav-main") {
      document.getElementById("nav-main").className = "nav-main vm";
    } else {
      document.getElementById("nav-main").className = "nav-main";
    }
  };

  const getClass = () => {
    let myClass = "nav";
    if (props.shadow) {
      myClass += " shadow";
    }

    if (props.border) {
      myClass += " bordered";
    }

    // if (props.justifyContent) {
    //   myStyle["--justifyContent"] = props.justifyContent;
    //   myClass += " " + props.justifyContent;
    // } else {
    //   myStyle["--justifyContent"] = "flex-start";
    // }
    if (props.className) {
      return myClass + " " + props.className;
    } else {
      return myClass;
    }
  };

  const getSubMenu = (menuData, index, depth) => {
    if (menuData.sub.length == 0) {
      return (
        <li className="nav-item" key={index}>
          {menuData.url ? (
            <div>
              <a href={menuData.url}>{menuData.title}</a>
            </div>
          ) : (
            <div>{menuData.title}</div>
          )}
        </li>
      );
    } else {
      return (
        <li
          className={depth > 1 ? "nav-item-sub-x" : "nav-item-sub"}
          key={index}
        >
          <div
            id={depth * index}
            className="navLink"
            onClick={(e) => {
              if (window.innerWidth < 600) {
                var selected = document.getElementById(depth * index);
                if (selected.className == "navLink") {
                  selected.className = "navLink vm";
                  selected.nextSibling.style = "display:block";
                } else {
                  selected.className = "navLink";
                  selected.nextSibling.style = "display:none";
                }
              }
            }}
          >
            {menuData.title}
          </div>
          <ul>
            {menuData.sub.map((r, i) => {
              return getSubMenu(r, i, depth + 1);
            })}
          </ul>
        </li>
      );
    }
  };

  return (
    <div className={getClass()} style={myStyle}>
      <div className="brand">
        {props.logo && <img src={props.logo} className="logo" />}
        {props.brand && <div className="brand-name">{props.brand}</div>}
      </div>

      <ul className="nav-main" id="nav-main">
        {props.data &&
          props.data.map((r, i) => {
            return getSubMenu(r, i, 1);
          })}
      </ul>

      <div className="nav-icon" onClick={handleNavClick} />
    </div>
  );
};

export default Nanvbar;
