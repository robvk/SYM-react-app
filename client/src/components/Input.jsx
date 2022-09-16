// React
import React from "react";
import PropTypes from "prop-types";

// Style
import style from "./Input.module.css";
import appStyle from "../App.module.css";

const Input = (props) => {
  return (
    <div className={`${style.input} ${appStyle.body}`}>
      <label className={appStyle.boldBody} htmlFor={props.id}>
        {props.label}
      </label>
      <div className={`${style.inputDiv} ${props.isFilled}`}>
        {props.src && <img src={props.src} alt={`${props.src} icon`} />}
        <input
          className={`${style.input} ${props.className}`}
          placeholder={props.placeholder}
          type={props.type}
          required
          id={props.id}
          ref={props.reference}
          aria-label={props.ariaLabel}
          onChange={props.onChange}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  reference: PropTypes.object.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.object,
  src: PropTypes.string,
  isFilled: PropTypes.any,
};

export default Input;
