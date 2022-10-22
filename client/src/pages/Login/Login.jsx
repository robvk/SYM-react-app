import React, { useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import style from "./Login.module.css";
import UserInfoContext from "../../context/UserInfoContext";
import { useNavigate } from "react-router-dom";
import appStyle from "../../App.module.css";
import Error from "../../components/Error/Error";
import { setCookie } from "../../hooks/useCookie";
import LogInForm from "./LoginForm";
import ProgressBar from "../../components/ProgressBar";
import NotifierContext from "../../context/NotifierContext";
import BackgroundImage from "../../components/BackgroundImage";

function Login() {
  const navigate = useNavigate();
  // Context
  const { notifier } = useContext(NotifierContext);
  const { setToken, setUserID, setUsername } = useContext(UserInfoContext);

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

  function onUserLogIn(user) {
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
  }

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
