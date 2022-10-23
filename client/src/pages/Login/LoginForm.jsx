// React
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Style
import style from "./Login.module.css";
import appStyle from "../../App.module.css";
// Icon
import envelop from "../../assets/icons/message-icon.svg";
import password from "../../assets/icons/lock-icon.svg";
// Component
import Input from "../../components/Input";
import Button from "../../components/Button";

const LogInForm = (props) => {
  const [isEmailFilled, setIsEmailFilled] = useState();
  const [isPasswordFilled, setIsPasswordFilled] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const logInHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    props.onUserLogIn(userData);
  };
  // Is email filled in?
  const emailChecker = (e) => {
    if (!e.target.value) {
      setIsEmailFilled(style.notFilled);
    } else {
      setIsEmailFilled("");
    }
  };
  // Is password filled in?
  const passwordChecker = (e) => {
    if (!e.target.value) {
      setIsPasswordFilled(style.notFilled);
    } else {
      setIsPasswordFilled("");
    }
  };

  return (
    <div>
      <div className={style.formDiv}>
        <form onSubmit={logInHandler}>
          <Input
            label="email"
            src={envelop}
            placeholder="johndoe@email.com"
            type="email"
            required
            id="email"
            reference={emailInputRef}
            ariaLabel="email"
            onChange={emailChecker}
            onClick={emailChecker}
            isFilled={isEmailFilled}
          />

          <Input
            label="password"
            placeholder="••••••••"
            src={password}
            type="password"
            required
            id="password"
            reference={passwordInputRef}
            ariaLabel="password"
            onClick={passwordChecker}
            onChange={passwordChecker}
            isFilled={isPasswordFilled}
          />

          <div className={style.singleButton}>
            <Button type="submit">Log In</Button>
          </div>
          <div className={`${appStyle.body} ${style.login}`}>
            Don&apos;t have an account? <Link to="/">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

LogInForm.propTypes = {
  onUserLogIn: PropTypes.func.isRequired,
};

export default LogInForm;
