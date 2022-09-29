// React
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
// Style
import style from "./Home.module.css";
import appStyle from "../../App.module.css";
import envelop from "../../assets/icons/message-icon.svg";
import password from "../../assets/icons/lock-icon.svg";
import person from "../../assets/icons/person-icon.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEmailFilled, setIsEmailFilled] = useState();
  const [isUsernameFilled, setIsUsernameFilled] = useState();
  const [isPasswordFilled, setIsPasswordFilled] = useState();
  const [isConfirmPasswordFilled, setIsConfirmPasswordFilled] = useState();
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signUpHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const userData = {
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      symScore: 0,
      dateCreated: date(),
    };

    props.onUserSignUp(userData);
  };

  const date = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  const passwordMatch = () => {
    if (
      passwordInputRef.current.value !==
        confirmPasswordInputRef.current.value ||
      !passwordInputRef.current.value
    ) {
      setIsDisabled(true);
      setIsConfirmPasswordFilled(style.notFilled);
    } else {
      setIsDisabled(false);
      setIsConfirmPasswordFilled("");
    }
  };

  const emailChecker = (e) => {
    if (!e.target.value) {
      setIsEmailFilled(style.notFilled);
    } else {
      setIsEmailFilled("");
    }
  };
  const usernameChecker = (e) => {
    if (!e.target.value) {
      setIsUsernameFilled(style.notFilled);
    } else {
      setIsUsernameFilled("");
    }
  };

  const passwordChecker = (e) => {
    passwordMatch();
    if (!e.target.value) {
      setIsPasswordFilled(style.notFilled);
    } else {
      setIsPasswordFilled("");
    }
  };

  const confirmPasswordChecker = (e) => {
    if (
      !e.target.value ||
      confirmPasswordInputRef.current.value !== passwordInputRef.current.value
    ) {
      setIsDisabled(true);
      setIsConfirmPasswordFilled(style.notFilled);
    } else {
      setIsDisabled(false);
      setIsConfirmPasswordFilled("");
    }
  };

  return (
    <div>
      <div className={style.formDiv}>
        <form onSubmit={signUpHandler}>
          <Input
            label="email"
            src={envelop}
            placeholder="i.e. johndoe@email.com"
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
            label="username"
            src={person}
            placeholder="i.e. JohnDoe"
            type="text"
            required
            id="username"
            reference={usernameInputRef}
            ariaLabel="username"
            onChange={usernameChecker}
            onClick={usernameChecker}
            isFilled={isUsernameFilled}
          />

          <Input
            label="password"
            placeholder="i.e. Password123!"
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

          <Input
            label="confirm password"
            placeholder="Password123!"
            src={password}
            type="password"
            required
            id="confirmPassword"
            reference={confirmPasswordInputRef}
            ariaLabel="password"
            onClick={confirmPasswordChecker}
            onChange={confirmPasswordChecker}
            isFilled={isConfirmPasswordFilled}
          />
          <div className={style.singleButton}>
            <Button
              type="submit"
              disabled={isDisabled}
              class={isDisabled ? "buttonDisabled" : ""}
            >
              Sign up
            </Button>
          </div>
          <div className={`${appStyle.body} ${style.login}`}>
            Have an account? <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  onUserSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
