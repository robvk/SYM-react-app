// React
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
// Style
import style from "./Home.module.css";
import envelop from "../../assets/icons/message-icon.svg";
import password from "../../assets/icons/lock-icon.svg";
import person from "../../assets/icons/person-icon.svg";

const SignUpForm = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEmailFilled, setIsEmailFilled] = useState();
  const [isUsernameFilled, setIsUsernameFilled] = useState();
  // const [isPassowrdFilled, setIsPassowrdFilled] = useState();
  // const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState();
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signUpHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const userData = {
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
    };

    props.onUserSignUp(userData);
  };

  const passwordCheck = () => {
    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    // if (!e.target.value) {
    // }
  };

  const emailChecker = (e) => {
    if (!e.target.value) {
      setIsEmailFilled(style.notFilled);
    } else {
      setIsEmailFilled(style.filled);
    }
  };
  const usernameChecker = (e) => {
    if (!e.target.value) {
      setIsUsernameFilled(style.notFilled);
    } else {
      setIsUsernameFilled(style.filled);
    }
  };
  // const valueChecker = (setTarget, e) => {
  //   if (!e.target.value) {
  //     setTarget(style.notFilled);
  //   } else {
  //     setTarget(style.filled);
  //   }
  // };
  // const valueChecker = (setTarget, e) => {
  //   if (!e.target.value) {
  //     setTarget(style.notFilled);
  //   } else {
  //     setTarget(style.filled);
  //   }
  // };

  return (
    <div>
      <div className={style.formDiv}>
        <form onSubmit={signUpHandler}>
          <div className={style.inputDiv}>
            <img src={envelop} />
            <input
              placeholder="email"
              type="email"
              required
              id="email"
              ref={emailInputRef}
              aria-label="email"
              onChange={emailChecker}
              onClick={emailChecker}
              className={isEmailFilled}
            />
          </div>
          <div className={style.inputDiv}>
            <img src={person} alt="person icon" />
            <input
              placeholder="username"
              type="text"
              required
              id="username"
              ref={usernameInputRef}
              aria-label="username"
              onChange={usernameChecker}
              onClick={usernameChecker}
              className={isUsernameFilled}
            />
          </div>
          <div className={style.inputDiv}>
            <img src={password} alt="password icon" />
            <input
              placeholder="password"
              type="password"
              required
              id="password"
              ref={passwordInputRef}
              aria-label="password"
              onChange={passwordCheck}
            />
          </div>
          <div className={style.inputDiv}>
            <img src={password} alt="password icon" />
            <input
              placeholder="confirm password"
              type="password"
              required
              id="confirmPassword"
              ref={confirmPasswordInputRef}
              aria-label="password"
              onChange={passwordCheck}
            />
          </div>
          <button type="submit" disabled={isDisabled}>
            Sign up!
          </button>
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  onUserSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
