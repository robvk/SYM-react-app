// React
import React from "react";
import { useEffect, useState } from "react";
// Hooks
import useFetch from "../../hooks/useFetch";
// Style
import style from "./Home.module.css";
import envelop from "../../assets/icons/message-icon.svg";
import password from "../../assets/icons/lock-icon.svg";
import person from "../../assets/icons/person-icon.svg";
import { useRef } from "react";

const Home = () => {
  const [totalJobAmount, setTotalJobAmount] = useState();
  const [sendersAmount, setSendersAmount] = useState();
  const [deliverersAmount, setDeliverersAmount] = useState();

  const onSuccess = (onReceived) => {
    setTotalJobAmount(onReceived.result.numOfTotalJobs);
    setSendersAmount(onReceived.result.numOfSenders);
    setDeliverersAmount(onReceived.result.numOfDeliverers);
  };

  const { performFetch, cancelFetch } = useFetch("/data/values", onSuccess);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return cancelFetch;
  }, []);

  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const signUpHandler = (e) => {
    e.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredUsername = usernameInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    // const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    const userData = {
      email: emailInputRef.current.value,
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
      confirmPasswordInputRef: confirmPasswordInputRef.current.value,
    };

    props.onUserSignUp(userData);
  };

  return (
    <div>
      <div className={style.formDiv}>
        <form onSubmit={signUpHandler}>
          <div className={style.inputDiv}>
            <img src={envelop} alt="envelop icon" />
            <input
              placeholder="email"
              type="email"
              required
              id="email"
              ref={emailInputRef}
              aria-label="email"
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
            />
          </div>
          <button>Sign up!</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
