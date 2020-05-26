import React, { useEffect, useState } from "react";

const Input = (props) => {
  const [values, setValues] = useState();
  let myType = "text";

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues(e.target.value);
  };

  if (props.type) {
    myType = props.type;
  }

  return (
    <div className="exInput-container">
      {props.label && <label className="exInput-label">{props.label}</label>}
      <input
        className="exInput"
        type={myType}
        value={values}
        onChange={handleInputChange}
      />
    </div>
  );
};

const Form = (props) => {
  const handleFormSubmit = () => {
    const elements = document.getElementsByClassName("exInput");
    [...elements].forEach((item) => {
      console.log(item.value);
    });
  };

  return (
    <div className="exForm">
      {props.children}
      <button className="exForm-button" onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
};

Form.Input = Input;

export default Form;
