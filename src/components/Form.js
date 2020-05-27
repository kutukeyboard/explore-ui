import React, { useEffect, useState, createContext, useContext } from "react";
import Button from "./Button";

const FormContext = createContext({});

const ActionButton = (props) => {
  let myStyle = {};
  const [formValue] = useContext(FormContext);

  const handleClick = () => {
    if (props.type != "reset") {
      props.onSubmit(formValue);
    }
    const element = document.getElementsByClassName("exInput");
    [...element].forEach((item) => (item.value = ""));
  };

  if (props.style) {
    myStyle = { ...myStyle, ...props.style };
  }

  return (
    <Button theme={props.theme} style={myStyle} onClick={handleClick}>
      {props.children}
    </Button>
  );
};

const Input = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);

  const [message, setMessage] = useState("");
  let myType = "text";

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage("");
    e.target.className = "exInput";

    setFormValue({ ...formValue, [props.name]: e.target.value });
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

      <div className="exInputHolder">
        <div className="exMarkerHolder">
          <input
            className="exInput"
            name={props.name}
            type={myType}
            onChange={handleInputChange}
          />
          <label className="requiredMark">{props.required ? "*" : ""}</label>
        </div>

        <label className="exErrorLabel">{message}</label>
      </div>
    </div>
  );
};

const Select = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);

  const [message, setMessage] = useState("");
  let myType = "text";

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage("");
    let result;

    e.target.className = "exInput";

    if (props.multiple) {
      const arrValue = Array.from(
        e.target.selectedOptions,
        (item) => item.value
      );
      setFormValue({ ...formValue, [props.name]: arrValue });
    } else {
      setFormValue({ ...formValue, [props.name]: e.target.value });
    }

    if (props.required && e.target.value.length == 0) {
      setMessage(props.name + " is required.");
      e.target.className = "exInput err";
      return;
    }
  };

  return (
    <div className="exInputContainer">
      {props.label && <label className="exInput-label">{props.label}</label>}

      <div className="exInputHolder">
        <div className="exMarkerHolder">
          <select
            className="exInput"
            name={props.name}
            type={myType}
            multiple={props.multiple ? true : false}
            onChange={handleInputChange}
          >
            {props.option &&
              props.option.map((r, i) => {
                return (
                  <option defaultValue={r.default} value={r.id} key={i}>
                    {r.option}
                  </option>
                );
              })}
          </select>
          <label className="requiredMark">{props.required ? "*" : ""}</label>
        </div>

        <label className="exErrorLabel">{message}</label>
      </div>
    </div>
  );
};

const Form = (props) => {
  const [formValue, setFormValue] = useState({});

  return (
    <FormContext.Provider value={[formValue, setFormValue]}>
      <div className="exForm">{props.children}</div>
    </FormContext.Provider>
  );
};

Form.Input = Input;
Form.Select = Select;
Form.ActionButton = ActionButton;
export default Form;
