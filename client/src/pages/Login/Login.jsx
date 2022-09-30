import React, { useEffect, useContext, useLayoutEffect } from "react";
import useFetch from "../../hooks/useFetch";
import style from "./Login.module.css";
import UserInfoContext from "../../context/UserInfoContext";
import { useNavigate } from "react-router-dom";
import appStyle from "../../App.module.css";
import Error from "../../components/Error/Error";
import { setCookie } from "../../hooks/useCookie";
import LogInForm from "./LoginForm";
import ProgressBar from "../../components/ProgressBar";
import bgImage from "../../assets/images/background-image.jpg";

function Login() {
  const { setToken, setUserID, setUsername } = useContext(UserInfoContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const onSuccess = (res) => {
    setCookie("token", res.data, 7);
    setCookie("userID", res.id, 7);
    setToken(res.data);
    setUserID(res.id);
    setUsername(res.username);
    navigate("/", {
      replace: true,
    });
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
        <div className={style.bgImageContainer}>
          <img src={bgImage} className={style.bgImage} />
        </div>
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
