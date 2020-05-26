import React, { useEffect, useState } from "react";
import Button from "./Button";

const Input = (props) => {
  const [values, setValues] = useState();
  const [message, setMessage] = useState("");
  let myType = "text";

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage("");
    e.target.className = "exInput";
    setValues(e.target.value);
    if (props.required && e.target.value.length == 0) {
      setMessage(props.name + " is required.");
      e.target.className = "exInput err";
      return;
    }
    if (props.min) {
      if (props.type == "number" && e.target.value < props.min) {
        setMessage(
          "Minimum value for " + props.name + " is " + props.min + "."
        );
        e.target.className = "exInput err";
        return;
      }
      if (props.type == "text" && e.target.value.length < props.min) {
        setMessage(
          "Minimum length for " + props.name + " is " + props.min + "."
        );
        e.target.className = "exInput err";
        return;
      }
    }

    if (props.max) {
      if (props.type == "number" && e.target.value > props.max) {
        setMessage(
          "maximum value for " + props.name + " is " + props.max + "."
        );
        e.target.className = "exInput err";
        return;
      }
      if (props.type == "text" && e.target.value.length > props.max) {
        setMessage(
          "Maximum length for " + props.name + " is " + props.max + "."
        );
        e.target.className = "exInput err";
        return;
      }
    }
  };

  if (props.type) {
    myType = props.type;
  }

  return (
    <div className="exInputContainer">
      {props.label && <label className="exInput-label">{props.label}</label>}
      <label className="requiredMark">{props.required ? "*" : ""}</label>
      <div className="exInputHolder">
        <input
          className="exInput"
          name={props.name}
          type={myType}
          value={values}
          onChange={handleInputChange}
        />
        <label className="exErrorLabel">{message}</label>
      </div>
    </div>
  );
};

const Form = (props) => {
  const handleFormSubmit = () => {
    let result = {};
    const elements = document.getElementsByClassName("exInput");
    [...elements].forEach((item) => {
      // console.log(item.name + " : " + item.value);
      result[item.name] = item.value;
    });
    props.onSubmit(result);
  };

  return (
    <div className="exForm">
      {props.children}
      <Button
        theme="primary"
        className="exFormButton"
        onClick={handleFormSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

Form.Input = Input;

export default Form;
