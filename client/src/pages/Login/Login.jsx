// React
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Hooks
import useFetch from "../../hooks/useFetch";
import { setCookie } from "../../hooks/useCookie";
// Style
import style from "./Login.module.css";
import appStyle from "../../App.module.css";
// Context
import UserInfoContext from "../../context/UserInfoContext";
import NotifierContext from "../../context/NotifierContext";
// Component
import Error from "../../components/Error/Error";
import LogInForm from "./LoginForm";
import ProgressBar from "../../components/ProgressBar";
import BackgroundImage from "../../components/BackgroundImage";

function Login() {
  const navigate = useNavigate();
  // Context
  const { notifier } = useContext(NotifierContext);
  const { setToken, setUserID, setUsername } = useContext(UserInfoContext);
  // Login success callback
  const onSuccess = (res) => {
    setCookie("token", res.data, 7);
    setCookie("userID", res.id, 7);
    setToken(res.data);
    setUserID(res.id);
    setUsername(res.username);
    navigate("/feed", {
      replace: true,
    });
    notifier("Welcome back!");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/authentication",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);
  const onUserLogIn = (user) => {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
  };

  return (
    <div>
      <ProgressBar loading={isLoading} />
      <div className={style.loginContainer}>
        <BackgroundImage />
        <div className={style.formContainer}>
          <div className={style.glassBox}>
            <h2 className={appStyle.headerOne}>WELCOME BACK, LOG IN!</h2>
            <LogInForm onUserLogIn={onUserLogIn} />
            <Error error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
