import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import Button from "./Button";

const FormContext = createContext({});
const ErrorContext = createContext();

const ActionButton = (props) => {
  let myStyle = {};
  const [formValue, setFormValue] = useContext(FormContext);
  const [formError, setFormError] = useContext(ErrorContext);
  const [disabled, setDisabled] = useState();

  const handleClick = () => {
    let foundError = 0;

    const element = document.getElementsByClassName("exInput");
    let err = {};
    [...element].forEach((item) => {
      if (props.type != "reset") {
        if (item.required && item.value == "") {
          err = { ...err, [item.name]: "required" };
          foundError += 1;
        }
      } else {
        item.value = "";
        item.className = "exInput";
      }
    });

    console.log("error found : " + foundError);
    setFormError({ ...formError, ...err });
    if (props.type != "reset" && foundError == 0) {
      props.onSubmit(formValue);
      [...element].forEach((item) => {
        item.value = "";
        item.className = "exInput";
      });
    }
  };

  if (props.style) {
    myStyle = { ...myStyle, ...props.style };
  }

  return (
    <Button
      theme={props.theme}
      disabled={disabled}
      style={myStyle}
      onClick={handleClick}
    >
      {props.children}
    </Button>
  );
};

const Input = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);
  const [formError, setFormError] = useContext(ErrorContext);

  const myInput = useRef(null);
  const [message, setMessage] = useState("");

  let myType = "text";

  useEffect(() => {
    formError[props.name] = false;
  }, []);

  useEffect(() => {
    if (formError[props.name] != false) {
      console.log(formError[props.name]);
      setMessage(props.name + " is required.");
      // // handleInputChange();
      myInput.current.className = "exInput err";
    }
  }, [formError]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage("");
    e.target.className = "exInput";

    setFormError({ ...formError, [props.name]: false });

    if (props.required && e.target.value.length == 0) {
      setFormError({
        ...formError,
        [props.name]: props.name + " is required.",
      });
      setMessage(props.name + " is required.");
      e.target.className = "exInput err";
      return;
    }
    if (props.min) {
      if (props.type == "number" && e.target.value < props.min) {
        setFormError({ ...formError, [props.name]: true });
        setMessage(
          "Minimum value for " + props.name + " is " + props.min + "."
        );
        e.target.className = "exInput err";
        return;
      }
      if (props.type == "text" && e.target.value.length < props.min) {
        setFormError({ ...formError, [props.name]: true });
        setMessage(
          "Minimum length for " + props.name + " is " + props.min + "."
        );
        e.target.className = "exInput err";
        return;
      }
    }

    if (props.max) {
      if (props.type == "number" && e.target.value > props.max) {
        setFormError({ ...formError, [props.name]: true });
        setMessage(
          "maximum value for " + props.name + " is " + props.max + "."
        );
        e.target.className = "exInput err";
        return;
      }
      if (props.type == "text" && e.target.value.length > props.max) {
        setFormError({ ...formError, [props.name]: true });
        setMessage(
          "Maximum length for " + props.name + " is " + props.max + "."
        );
        e.target.className = "exInput err";
        return;
      }
    }

    if (props.type == "number") {
      setFormValue({ ...formValue, [props.name]: parseFloat(e.target.value) });
    } else {
      setFormValue({ ...formValue, [props.name]: e.target.value });
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
            ref={myInput}
            type={myType}
            required={props.required}
            onChange={handleInputChange}
          />
          <label className="requiredMark">{props.required ? "*" : ""}</label>
        </div>

        <label className="exErrorLabel">{message != "" ? message : ""}</label>
      </div>
    </div>
  );
};

const Select = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);
  const [formError, setFormError] = useContext(ErrorContext);

  const [message, setMessage] = useState("");
  let myType = "text";

  useEffect(() => {
    const option = Object.values(props.option).find((o) => o.default == true);
    formValue[props.name] = option.value;
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage("");
    let result;
    e.target.className = "exInput";
    setFormError({ ...formError, [props.name]: false });

    if (props.multiple) {
      const arrValue = Array.from(e.target.selectedOptions, (item) =>
        parseFloat(item.value)
      );
      setFormValue({ ...formValue, [props.name]: arrValue });
    } else {
      setFormValue({ ...formValue, [props.name]: e.target.value });
    }

    if (props.required && e.target.value.length == 0) {
      setFormError({ ...formError, [props.name]: true });
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
            required={props.required}
            multiple={props.multiple ? true : false}
            onChange={handleInputChange}
          >
            {props.option &&
              props.option.map((r, i) => {
                return (
                  <option defaultChecked={r.default} value={r.value} key={i}>
                    {r.label}
                  </option>
                );
              })}
          </select>
          <label className="requiredMark">{props.required ? "*" : ""}</label>
        </div>
        <label className="exErrorLabel">
          {formError[props.name] == true ? message : ""}
        </label>
      </div>
    </div>
  );
};

const Check = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);
  const [formError, setFormError] = useContext(ErrorContext);

  const handleChange = (e) => {
    let obj = {};
    if (e.target.checked) {
      [formValue[props.name]].forEach((item) => {
        obj = { ...obj, ...item };
      });
      obj = { ...obj, [e.target.name]: e.target.value };
      setFormValue({ ...formValue, [props.name]: obj });
    } else {
      const arr = formValue[props.name];
      delete arr[e.target.name];
      setFormValue({ ...formValue, [props.name]: arr });
    }
  };

  useEffect(() => {
    const option = Object.values(props.data).find((o) => o.default == true);
    formValue[props.name] = { [option.label]: option.value };
  }, []);

  return (
    <div className="exInputContainer">
      {props.label && <label className="exInput-label">{props.label}</label>}

      <div className="exInputHolder">
        <div className="exHorizontalHolder">
          {props.data &&
            props.data.map((r, i) => {
              return (
                <label key={i}>
                  <input
                    className="exInput"
                    type="checkbox"
                    defaultChecked={r.default}
                    name={r.label}
                    value={r.value}
                    onChange={handleChange}
                  />
                  {r.label}
                </label>
              );
            })}
        </div>
        <label className="exErrorLabel">
          {formError[props.name] == true ? message : ""}
        </label>
      </div>
    </div>
  );
};

const Radio = (props) => {
  const [formValue, setFormValue] = useContext(FormContext);
  const [formError, setFormError] = useContext(ErrorContext);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [props.name]: e.target.value });
  };

  useEffect(() => {
    const option = Object.values(props.data).find((o) => o.default == true);
    formValue[props.name] = option.value;
  }, []);

  return (
    <div className="exInputContainer">
      {props.label && <label className="exInput-label">{props.label}</label>}

      <div className="exInputHolder">
        <div className="exHorizontalHolder">
          {props.data &&
            props.data.map((r, i) => {
              return (
                <label key={i}>
                  <input
                    className="exInput"
                    type="radio"
                    defaultChecked={r.default}
                    name={props.name}
                    value={r.value}
                    onChange={handleChange}
                  />
                  {r.label}
                </label>
              );
            })}
        </div>
        <label className="exErrorLabel">
          {formError[props.name] == true ? message : ""}
        </label>
      </div>
    </div>
  );
};

const Form = (props) => {
  const [formValue, setFormValue] = useState({});
  const [formError, setFormError] = useState({});

  return (
    <FormContext.Provider value={[formValue, setFormValue]}>
      <ErrorContext.Provider value={[formError, setFormError]}>
        <div className="exForm">{props.children}</div>
      </ErrorContext.Provider>
    </FormContext.Provider>
  );
};

Form.Input = Input;
Form.Select = Select;
Form.Check = Check;
Form.Radio = Radio;
Form.ActionButton = ActionButton;
export default Form;
